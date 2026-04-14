"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface ContactFormData {
  nome: string;
  telefone: string;
  email: string;
  assunto: string;
  mensagem: string;
}

export async function sendContactEmail(data: ContactFormData) {
  try {
    await resend.emails.send({
      from: "Agrofortes Site <onboarding@resend.dev>",
      to: ["contato@agrofortes.com.br"],
      replyTo: data.email,
      subject: `[Contato Site] ${data.assunto}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #0D3B2E; padding: 24px 32px;">
            <h1 style="color: #B8963E; margin: 0; font-size: 22px; font-weight: 600;">
              AGROFORTES
            </h1>
            <p style="color: rgba(255,255,255,0.6); margin: 4px 0 0; font-size: 12px; letter-spacing: 2px; text-transform: uppercase;">
              Nova mensagem do site
            </p>
          </div>

          <div style="background: #ffffff; padding: 32px; border: 1px solid #e5e7eb;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; width: 130px;">
                  <span style="font-size: 11px; font-weight: 600; color: #B8963E; text-transform: uppercase; letter-spacing: 1px;">Nome</span>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">
                  <span style="font-size: 14px; color: #0D3B2E;">${data.nome}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">
                  <span style="font-size: 11px; font-weight: 600; color: #B8963E; text-transform: uppercase; letter-spacing: 1px;">Telefone</span>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">
                  <span style="font-size: 14px; color: #0D3B2E;">${data.telefone}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">
                  <span style="font-size: 11px; font-weight: 600; color: #B8963E; text-transform: uppercase; letter-spacing: 1px;">E-mail</span>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">
                  <span style="font-size: 14px; color: #0D3B2E;">${data.email}</span>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">
                  <span style="font-size: 11px; font-weight: 600; color: #B8963E; text-transform: uppercase; letter-spacing: 1px;">Assunto</span>
                </td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6;">
                  <span style="font-size: 14px; color: #0D3B2E;">${data.assunto}</span>
                </td>
              </tr>
            </table>

            <div style="margin-top: 20px;">
              <p style="font-size: 11px; font-weight: 600; color: #B8963E; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 8px;">Mensagem</p>
              <p style="font-size: 14px; color: #374151; line-height: 1.7; margin: 0; white-space: pre-line;">${data.mensagem}</p>
            </div>
          </div>

          <div style="background: #f7f3ec; padding: 16px 32px; text-align: center;">
            <p style="font-size: 11px; color: #9ca3af; margin: 0;">
              Mensagem enviada via formulário do site agrofortes.com.br
            </p>
          </div>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    return { success: false, error: "Não foi possível enviar a mensagem." };
  }
}
