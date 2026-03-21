import type { APIRoute } from 'astro';
import { EmailMessage } from 'cloudflare:email';

// Disable prerendering to ensure this endpoint is always rendered on-demand
export const prerender = false;

interface TurnstileResponse {
  success: boolean;
  'error-codes'?: string[];
}

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    const formData = await request.formData();

    // 1. ZMIENNE ŚRODOWISKOWE Z CLOUDFLARE
    const db = locals.runtime.env.DB;
    const turnstileSecret = locals.runtime.env.TURNSTILE_SECRET_KEY;

    // Log environment variables for debugging
    console.log('Environment check:', {
      hasDB: !!db,
      hasTurnstileSecret: !!turnstileSecret,
    });

    if (!turnstileSecret) {
      console.error('TURNSTILE_SECRET_KEY is not configured');
      return new Response('Błąd konfiguracji: brak klucza Turnstile', { status: 500 });
    }

    // 2. WERYFIKACJA TURNSTILE
    const turnstileResponse = formData.get('cf-turnstile-response');
    console.log('Turnstile response present:', !!turnstileResponse);
    
    if (turnstileResponse) {
      console.log('Verifying Turnstile token...');
      const verifyTurnstile = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${turnstileSecret}&response=${turnstileResponse}`,
      });
      const turnstileResult = await verifyTurnstile.json() as TurnstileResponse;
      console.log('Turnstile verification result:', turnstileResult.success);
      
      if (!turnstileResult.success) {
        console.error('Turnstile verification failed:', turnstileResult['error-codes']);
        return new Response('Błąd weryfikacji antyspamowej.', { status: 400 });
      }
    } else {
      // Wymuszenie weryfikacji
      console.error('No Turnstile token received');
      return new Response('Brak tokenu weryfikacji antyspamowej.', { status: 400 });
    }

    // 3. PARSOWANIE DANYCH (Formatowanie do stylu Webflow)
    const formName = formData.get('form_name')?.toString() || 'default_form';
    const dataObj: Record<string, string | boolean> = {};
    formData.forEach((value, key) => {
      if (key !== 'cf-turnstile-response' && key !== 'form_name') {
        // Zmiana checkboxów "true" na wartości logiczne jeśli trzeba,
        // ale Twój GAS radzi sobie ze stringiem "true"
        dataObj[key] = value.toString();
      }
    });

    // Tworzymy strukturę JSON, jakiej oczekuje makro GAS
    const webflowStylePayload = {
      name: formName,
      data: dataObj,
      d: new Date().toISOString(),
    };
    const payloadString = JSON.stringify(webflowStylePayload);

    // 4. ZAPIS DO BAZY D1 (Backup)
    if (db) {
      console.log('Saving to D1 database...');
      const dbResult = await db.prepare(
        "INSERT INTO form_submissions (form_name, payload) VALUES (?, ?)"
      )
        .bind(formName, payloadString)
        .run();
      console.log('D1 save result:', dbResult.success);
    } else {
      console.warn("Brak połączenia z D1 - pomijam zapis.");
    }

    // 5. WYSYŁANIE E-MAILA Z POWIADOMIENIEM
    const sendEmail = locals.runtime.env.SEND_EMAIL;
    if (sendEmail) {
      try {
        console.log('Sending email notification...');
        
        // Zbieramy dane do stringa z prawidłowymi zakończeniami linii \r\n
        let bodyText = `Nowe zgłoszenie z formularza: ${formName}\r\n\r\n`;
        bodyText += `Data: ${new Date().toLocaleString('pl-PL')}\r\n\r\n`;
        bodyText += `Dane formularza:\r\n`;
        for (const [key, value] of Object.entries(dataObj)) {
          bodyText += `${key}: ${value}\r\n`;
        }

        // Ręczne składanie RAW email z wymuszonym kodowaniem UTF-8
        // Używamy Quoted-Printable (8bit), co zapobiega psuciu przez filtry
        const rawEmailString = 
`From: "Imprezowy Fotograf - Formularz" <noreply@imprezowyfotograf.pl>\r\n` +
`To: andrzej@pineaddle.com\r\n` +
`Subject: Nowe zgłoszenie: ${formName}\r\n` +
`MIME-Version: 1.0\r\n` +
`Content-Type: text/plain; charset=utf-8\r\n` +
`Content-Transfer-Encoding: 8bit\r\n` +
`\r\n` + // Pusta linia oddzielająca nagłówki od treści
`${bodyText}`;

        // Konwersja zbudowanego tekstu na Message dla Cloudflare
        const message = new EmailMessage(
          "noreply@imprezowyfotograf.pl",
          "andrzej@pineaddle.com",
          rawEmailString
        );

        await sendEmail.send(message);
        console.log('Email sent successfully');
      } catch (emailError) {
        console.error('Failed to send email:', emailError);
        // Nie blokujemy odpowiedzi - email nie jest krytyczny
      }
    } else {
      console.warn("SEND_EMAIL binding not configured - skipping email notification");
    }

    // 6. SUKCES - ZWRACAMY ODPOWIEDŹ
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Formularz został pomyślnie wysłany.' 
    }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("Błąd przetwarzania:", error);
    return new Response(JSON.stringify({ 
      success: false, 
      message: 'Wystąpił błąd serwera. Spróbuj ponownie później.' 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};