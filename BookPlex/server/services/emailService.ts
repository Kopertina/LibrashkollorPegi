import nodemailer from 'nodemailer';
import { type Order, type CartItem } from '@shared/schema';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || process.env.GMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || process.env.GMAIL_PASS || 'your-app-password'
  }
});

export async function sendOrderNotification(order: Order): Promise<void> {
  const orderItems: CartItem[] = JSON.parse(order.orderItems);
  
  const itemsHtml = orderItems.map(item => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">${item.title}</td>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb;">Grade ${item.grade}</td>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: right;">$${item.price}</td>
      <td style="padding: 8px; border-bottom: 1px solid #e5e7eb; text-align: right;">$${(parseFloat(item.price) * item.quantity).toFixed(2)}</td>
    </tr>
  `).join('');

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1e40af; margin-bottom: 20px;">New BookMart Order - ${order.id}</h2>
      
      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h3 style="margin-top: 0; color: #374151;">Customer Information</h3>
        <p><strong>Name:</strong> ${order.customerName}</p>
        <p><strong>Phone:</strong> ${order.customerPhone}</p>
        <p><strong>Address:</strong><br>${order.customerAddress.replace(/\n/g, '<br>')}</p>
        ${order.additionalInfo ? `<p><strong>Additional Info:</strong><br>${order.additionalInfo.replace(/\n/g, '<br>')}</p>` : ''}
      </div>

      <div style="margin-bottom: 20px;">
        <h3 style="color: #374151;">Order Items</h3>
        <table style="width: 100%; border-collapse: collapse; border: 1px solid #e5e7eb;">
          <thead>
            <tr style="background-color: #f9fafb;">
              <th style="padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb;">Book Title</th>
              <th style="padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb;">Grade</th>
              <th style="padding: 12px; text-align: center; border-bottom: 1px solid #e5e7eb;">Qty</th>
              <th style="padding: 12px; text-align: right; border-bottom: 1px solid #e5e7eb;">Price</th>
              <th style="padding: 12px; text-align: right; border-bottom: 1px solid #e5e7eb;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
          <tfoot>
            <tr style="background-color: #f9fafb; font-weight: bold;">
              <td colspan="4" style="padding: 12px; text-align: right; border-top: 2px solid #e5e7eb;">Order Total:</td>
              <td style="padding: 12px; text-align: right; border-top: 2px solid #e5e7eb; color: #1e40af;">$${order.total}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
        <p style="margin: 0; color: #92400e;">
          <strong>Payment Reminder:</strong> This order requires peer-to-peer payment arrangement. 
          Please contact the customer at ${order.customerPhone} to arrange payment and delivery.
        </p>
      </div>

      <p style="margin-top: 20px; color: #6b7280; font-size: 14px;">
        Order placed on: ${new Date(order.createdAt).toLocaleString()}
      </p>
    </div>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER || process.env.GMAIL_USER || 'bookmart@example.com',
    to: 'erikselimi205@gmail.com',
    subject: `New BookMart Order - ${order.id}`,
    html: emailHtml
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Order notification email sent successfully');
  } catch (error) {
    console.error('Failed to send order notification email:', error);
    throw new Error('Failed to send email notification');
  }
}
