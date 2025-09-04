import nodemailer from 'nodemailer';
import { cfg } from './config';

export async function sendHandoffEmail({ 
  fromEmail, 
  name, 
  topic, 
  message 
}: { 
  fromEmail: string; 
  name?: string; 
  topic?: string; 
  message?: string 
}): Promise<boolean> {
  if (!cfg.smtp.host || !cfg.smtp.user || !cfg.smtp.pass) {
    console.warn('SMTP not configured; pretending success for dev.');
    return true; // dev mode: don't block if SMTP missing
  }
  
  try {
    const transporter = nodemailer.createTransport({
      host: cfg.smtp.host,
      port: cfg.smtp.port,
      secure: cfg.smtp.port === 465,
      auth: { 
        user: cfg.smtp.user, 
        pass: cfg.smtp.pass 
      }
    });
    
    const info = await transporter.sendMail({
      from: cfg.smtp.from,
      to: cfg.smtp.to,
      subject: `[Camwood Chatbot] ${topic || 'Consultation Request'}`,
      replyTo: fromEmail || undefined,
      text: `Name: ${name || 'N/A'}
Email: ${fromEmail}
Topic: ${topic || 'N/A'}

Message:
${message || ''}`
    });
    
    return !!info.messageId;
  } catch (error) {
    console.error('Failed to send handoff email:', error);
    return false;
  }
}