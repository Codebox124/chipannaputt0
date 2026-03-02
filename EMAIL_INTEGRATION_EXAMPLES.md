# Email Service Integration Examples

This guide shows how to integrate various email services with the `/api/send-email` endpoint.

## Option 1: SendGrid (Recommended)

### Setup:
```bash
npm install @sendgrid/mail
```

### 1. Get API Key
- Visit: https://app.sendgrid.com/settings/api_keys
- Create API key
- Add to `.env.local`:
```
SENDGRID_API_KEY=SG.your_key_here
SENDGRID_FROM_EMAIL=noreply@chipannaputt.com
SENDGRID_TO_EMAIL=chipannaputt8@gmail.com
```

### 2. Update `/app/api/send-email/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '')

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { type, data } = body

        if (!type || !data) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        let emailSubject = ''
        let emailHtml = ''
        let emailText = ''
        let replyTo = ''

        if (type === 'contact') {
            const { name, email, phone, subject, message } = data
            replyTo = email

            emailSubject = `New Contact Form: ${subject}`
            emailHtml = `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <h3>Message:</h3>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `
            emailText = `
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Subject: ${subject}

Message:
${message}
            `
        } else if (type === 'review') {
            const { name, email, rating, review, videoUrl } = data
            replyTo = email

            emailSubject = `New Review from ${name}`
            emailHtml = `
                <h2>New Student Review</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Rating:</strong> ${'⭐'.repeat(rating)} (${rating}/5)</p>
                ${videoUrl ? `<p><strong>Video:</strong> <a href="${videoUrl}">Watch Review</a></p>` : ''}
                <h3>Review:</h3>
                <p>${review.replace(/\n/g, '<br>')}</p>
            `
            emailText = `
Name: ${name}
Email: ${email}
Rating: ${rating} stars
Video: ${videoUrl || 'No video'}

Review:
${review}
            `
        }

        // Send email to admin
        const msg = {
            to: process.env.SENDGRID_TO_EMAIL || 'chipannaputt8@gmail.com',
            from: process.env.SENDGRID_FROM_EMAIL || 'noreply@chipannaputt.com',
            replyTo,
            subject: emailSubject,
            html: emailHtml,
            text: emailText,
        }

        await sgMail.send(msg)

        // Send confirmation email to customer
        const confirmationMsg = {
            to: data.email,
            from: process.env.SENDGRID_FROM_EMAIL || 'noreply@chipannaputt.com',
            subject: 'We received your message',
            html: `
                <h2>Thank you for contacting Chip Anna Putt!</h2>
                <p>We've received your ${type === 'contact' ? 'inquiry' : 'review'} and will respond within 24 hours.</p>
                <p>Best regards,<br/>Don Sheppard<br/>Chip Anna Putt</p>
            `,
        }

        await sgMail.send(confirmationMsg)

        console.log('[v0] Email sent successfully via SendGrid')
        return NextResponse.json(
            { success: true, message: 'Email sent successfully' },
            { status: 200 }
        )
    } catch (error) {
        console.error('[v0] SendGrid error:', error)
        return NextResponse.json(
            { error: 'Failed to send email' },
            { status: 500 }
        )
    }
}
```

---

## Option 2: Resend (Easy)

### Setup:
```bash
npm install resend
```

### 1. Get API Key
- Visit: https://resend.com/api-keys
- Create API key
- Add to `.env.local`:
```
RESEND_API_KEY=re_your_key_here
RESEND_FROM_EMAIL=noreply@chipannaputt.com
RESEND_TO_EMAIL=chipannaputt8@gmail.com
```

### 2. Update `/app/api/send-email/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { type, data } = body

        if (!type || !data) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        let emailSubject = ''
        let emailHtml = ''

        if (type === 'contact') {
            const { name, email, phone, subject, message } = data

            emailSubject = `New Contact Form: ${subject}`
            emailHtml = `
                <h2>New Contact Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <h3>Message:</h3>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `
        } else if (type === 'review') {
            const { name, email, rating, review, videoUrl } = data

            emailSubject = `New Review from ${name}`
            emailHtml = `
                <h2>New Student Review</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Rating:</strong> ${'⭐'.repeat(rating)} (${rating}/5)</p>
                ${videoUrl ? `<p><strong>Video:</strong> <a href="${videoUrl}">Watch Review</a></p>` : ''}
                <h3>Review:</h3>
                <p>${review.replace(/\n/g, '<br>')}</p>
            `
        }

        // Send to admin
        await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'noreply@chipannaputt.com',
            to: process.env.RESEND_TO_EMAIL || 'chipannaputt8@gmail.com',
            replyTo: data.email,
            subject: emailSubject,
            html: emailHtml,
        })

        // Send confirmation to customer
        await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'noreply@chipannaputt.com',
            to: data.email,
            subject: 'We received your message',
            html: `<h2>Thank you!</h2><p>We've received your ${type} and will respond within 24 hours.</p>`,
        })

        return NextResponse.json(
            { success: true, message: 'Email sent successfully' },
            { status: 200 }
        )
    } catch (error) {
        console.error('[v0] Resend error:', error)
        return NextResponse.json(
            { error: 'Failed to send email' },
            { status: 500 }
        )
    }
}
```

---

## Option 3: AWS SES

### Setup:
```bash
npm install @aws-sdk/client-ses
```

### 1. Configure AWS
- Set up SES in AWS console
- Verify email address
- Add to `.env.local`:
```
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_REGION=us-east-1
AWS_SES_EMAIL=noreply@chipannaputt.com
```

### 2. Update `/app/api/send-email/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'

const sesClient = new SESClient({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    },
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { type, data } = body

        if (!type || !data) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        let emailSubject = ''
        let emailHtml = ''

        if (type === 'contact') {
            const { name, email, phone, subject, message } = data
            emailSubject = `New Contact Form: ${subject}`
            emailHtml = `<h2>New Contact</h2><p>${message}</p><p>From: ${name} (${email})</p>`
        } else if (type === 'review') {
            const { name, email, rating, review, videoUrl } = data
            emailSubject = `New Review from ${name}`
            emailHtml = `<h2>New Review</h2><p>${review}</p><p>Rating: ${'⭐'.repeat(rating)}</p>`
        }

        const params = {
            Source: process.env.AWS_SES_EMAIL || 'noreply@chipannaputt.com',
            Destination: {
                ToAddresses: ['chipannaputt8@gmail.com'],
                ReplyToAddresses: [data.email],
            },
            Message: {
                Subject: { Data: emailSubject },
                Body: { Html: { Data: emailHtml } },
            },
        }

        await sesClient.send(new SendEmailCommand(params))

        return NextResponse.json(
            { success: true, message: 'Email sent successfully' },
            { status: 200 }
        )
    } catch (error) {
        console.error('[v0] AWS SES error:', error)
        return NextResponse.json(
            { error: 'Failed to send email' },
            { status: 500 }
        )
    }
}
```

---

## Option 4: Mailgun

### Setup:
```bash
npm install mailgun.js
```

### 1. Get Credentials
- Visit: https://app.mailgun.com/app/account/security/api_keys
- Get API key and domain
- Add to `.env.local`:
```
MAILGUN_API_KEY=key-your_key_here
MAILGUN_DOMAIN=mg.chipannaputt.com
MAILGUN_FROM=noreply@chipannaputt.com
```

### 2. Update `/app/api/send-email/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import FormData from 'form-data'
import Mailgun from 'mailgun.js'

const mailgun = new Mailgun(FormData)
const mg = mailgun.client({
    username: 'api',
    key: process.env.MAILGUN_API_KEY || '',
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { type, data } = body

        if (!type || !data) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        let emailSubject = ''
        let emailText = ''

        if (type === 'contact') {
            const { name, email, subject, message } = data
            emailSubject = `New Contact: ${subject}`
            emailText = `From: ${name}\nEmail: ${email}\n\n${message}`
        } else if (type === 'review') {
            const { name, email, rating, review } = data
            emailSubject = `New Review from ${name} (${rating} stars)`
            emailText = review
        }

        await mg.messages.create(process.env.MAILGUN_DOMAIN || '', {
            from: process.env.MAILGUN_FROM || 'noreply@chipannaputt.com',
            to: 'chipannaputt8@gmail.com',
            replyTo: data.email,
            subject: emailSubject,
            text: emailText,
        })

        return NextResponse.json(
            { success: true, message: 'Email sent successfully' },
            { status: 200 }
        )
    } catch (error) {
        console.error('[v0] Mailgun error:', error)
        return NextResponse.json(
            { error: 'Failed to send email' },
            { status: 500 }
        )
    }
}
```

---

## Testing Your Integration

### 1. Test with curl:
```bash
curl -X POST http://localhost:3000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "type": "contact",
    "data": {
      "name": "Test User",
      "email": "test@example.com",
      "phone": "555-0000",
      "subject": "Test inquiry",
      "message": "This is a test message"
    }
  }'
```

### 2. Test with browser console:
```javascript
fetch('/api/send-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    type: 'contact',
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '555-0000',
      subject: 'Test',
      message: 'Test message'
    }
  })
})
.then(r => r.json())
.then(d => console.log(d))
```

### 3. Check for confirmation:
- Admin email should receive submission
- Customer should get confirmation reply
- Check spam/junk folder

---

## Add Rate Limiting

Prevent spam submissions with Upstash:

```typescript
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 h'), // 5 per hour
})

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 'anonymous'
  const { success } = await ratelimit.limit(ip)

  if (!success) {
    return NextResponse.json(
      { error: 'Too many submissions. Try again later.' },
      { status: 429 }
    )
  }

  // ... rest of code
}
```

---

## Recommended Approach

**For Quick Setup**: Use **Resend** (easiest integration)
**For Production**: Use **SendGrid** (most reliable)
**For Enterprise**: Use **AWS SES** (cost-effective at scale)
**For Open Source**: Use **Mailgun** (flexible)

All options provide:
- Free tier for testing
- Easy setup
- Reliable delivery
- Good documentation

Choose based on your needs and budget!
