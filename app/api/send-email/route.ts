// app/api/send-email/route.ts
import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

// Email templates
const templates = {
  contact: (data: any) => `
    <div style="font-family: system-ui, sans-serif, Arial; font-size: 14px; color: #212121; background-color: #f5f5f5; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background-color: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #2eaf4f 0%, #1a7f37 100%); padding: 40px 24px; text-align: center;">
          <div style="background-color: rgba(255,255,255,0.1); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center; font-size: 40px;">
            ⛳
          </div>
          <h1 style="color: white; font-size: 28px; margin: 0 0 8px 0; font-weight: bold;">New Contact Message!</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 16px;">Someone wants to get in touch</p>
        </div>

        <!-- Content -->
        <div style="padding: 32px 24px;">
          
          <!-- Customer Info -->
          <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 24px; border-radius: 12px; margin-bottom: 24px; border-left: 4px solid #2eaf4f;">
            <h2 style="margin: 0 0 20px 0; font-size: 20px; color: #2eaf4f;">Contact Information</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6;">
                  <div style="font-size: 12px; color: #6c757d; text-transform: uppercase; letter-spacing: 0.5px;">Name</div>
                  <div style="font-size: 16px; font-weight: 600; color: #212121;">${data.name}</div>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6;">
                  <div style="font-size: 12px; color: #6c757d; text-transform: uppercase; letter-spacing: 0.5px;">Email</div>
                  <div style="font-size: 16px; font-weight: 600;">
                    <a href="mailto:${data.email}" style="color: #2eaf4f; text-decoration: none;">${data.email}</a>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0;">
                  <div style="font-size: 12px; color: #6c757d; text-transform: uppercase; letter-spacing: 0.5px;">Phone</div>
                  <div style="font-size: 16px; font-weight: 600;">
                    <a href="tel:${data.phone}" style="color: #2eaf4f; text-decoration: none;">${data.phone}</a>
                  </div>
                </td>
              </tr>
            </table>
          </div>

          <!-- Subject Badge -->
          ${data.subject ? `
          <div style="margin-bottom: 24px;">
            <div style="display: inline-block; background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%); padding: 12px 20px; border-radius: 24px; border: 2px solid #ffb74d;">
              <span style="font-size: 18px; margin-right: 8px;">📌</span>
              <span style="font-size: 14px; font-weight: 600; color: #e65100; text-transform: uppercase;">Subject:</span>
              <span style="font-size: 16px; font-weight: bold; color: #bf360c; margin-left: 8px;">${data.subject}</span>
            </div>
          </div>
          ` : ''}

          <!-- Message -->
          <div style="background-color: #ffffff; border: 2px solid #e9ecef; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
            <h3 style="margin: 0 0 16px 0; font-size: 18px; color: #495057;">💬 Message</h3>
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #2eaf4f;">
              <p style="margin: 0; font-size: 16px; line-height: 1.8; color: #212121; white-space: pre-wrap;">${data.message}</p>
            </div>
          </div>

          <!-- Action Buttons -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 24px;">
            <a href="mailto:${data.email}" style="display: block; background: linear-gradient(135deg, #2eaf4f 0%, #1a7f37 100%); color: white; text-align: center; padding: 16px; border-radius: 8px; text-decoration: none; font-weight: 600;">
              📧 Reply via Email
            </a>
            <a href="tel:${data.phone}" style="display: block; background: linear-gradient(135deg, #0288d1 0%, #01579b 100%); color: white; text-align: center; padding: 16px; border-radius: 8px; text-decoration: none; font-weight: 600;">
              📞 Call Now
            </a>
          </div>

        </div>

        <!-- Footer -->
        <div style="background: linear-gradient(135deg, #212121 0%, #424242 100%); padding: 32px 24px; text-align: center; color: white;">
          <div style="font-size: 24px; font-weight: bold; margin-bottom: 8px;">⛳ Chip Anna Putt</div>
          <div style="font-size: 14px; opacity: 0.8;">Master Your Short Game</div>
          <div style="border-top: 1px solid rgba(255,255,255,0.2); margin-top: 20px; padding-top: 20px;">
            <div style="margin-bottom: 12px;">
              <a href="tel:608-530-8582" style="color: white; text-decoration: none; margin: 0 8px;">📞 608-530-8582</a>
              <span style="opacity: 0.5;">|</span>
              <a href="tel:608-359-1581" style="color: white; text-decoration: none; margin: 0 8px;">📱 608-359-1581</a>
            </div>
            <div style="font-size: 14px; opacity: 0.8;">📍 1013 Bingham Ave., Janesville, WI 53546</div>
          </div>
        </div>

      </div>
    </div>
  `,

  lessons: (data: any) => `
    <div style="font-family: system-ui, sans-serif, Arial; font-size: 14px; color: #212121; background-color: #f5f5f5; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background-color: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        
        <div style="background: linear-gradient(135deg, #2eaf4f 0%, #1a7f37 100%); padding: 40px 24px; text-align: center;">
          <div style="background-color: rgba(255,255,255,0.1); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 16px; font-size: 40px; display: flex; align-items: center; justify-content: center;">
            ⛳
          </div>
          <h1 style="color: white; font-size: 28px; margin: 0 0 8px 0; font-weight: bold;">New Lesson Request!</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 16px;">Someone wants to book a lesson</p>
        </div>

        <div style="padding: 32px 24px;">
          
          <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 24px; border-radius: 12px; margin-bottom: 24px; border-left: 4px solid #2eaf4f;">
            <h2 style="margin: 0 0 20px 0; font-size: 20px; color: #2eaf4f;">Contact Information</h2>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6;">
                  <div style="font-size: 12px; color: #6c757d; text-transform: uppercase;">Name</div>
                  <div style="font-size: 16px; font-weight: 600;">${data.name}</div>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #dee2e6;">
                  <div style="font-size: 12px; color: #6c757d; text-transform: uppercase;">Email</div>
                  <div style="font-size: 16px; font-weight: 600;">
                    <a href="mailto:${data.email}" style="color: #2eaf4f; text-decoration: none;">${data.email}</a>
                  </div>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px 0;">
                  <div style="font-size: 12px; color: #6c757d; text-transform: uppercase;">Phone</div>
                  <div style="font-size: 16px; font-weight: 600;">
                    <a href="tel:${data.phone}" style="color: #2eaf4f; text-decoration: none;">${data.phone}</a>
                  </div>
                </td>
              </tr>
            </table>
          </div>

          <div style="margin-bottom: 24px;">
            <div style="display: inline-block; background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%); padding: 12px 20px; border-radius: 24px; border: 2px solid #66bb6a;">
              <span style="font-size: 18px; margin-right: 8px;">📚</span>
              <span style="font-size: 14px; font-weight: 600; color: #2e7d32; text-transform: uppercase;">Lesson Type:</span>
              <span style="font-size: 16px; font-weight: bold; color: #1b5e20; margin-left: 8px;">${data.lessonType}</span>
            </div>
          </div>

          ${data.message ? `
          <div style="background-color: #ffffff; border: 2px solid #e9ecef; border-radius: 12px; padding: 24px;">
            <h3 style="margin: 0 0 16px 0; font-size: 18px; color: #495057;">💬 Message</h3>
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; border-left: 4px solid #2eaf4f;">
              <p style="margin: 0; font-size: 16px; line-height: 1.8; white-space: pre-wrap;">${data.message}</p>
            </div>
          </div>
          ` : ''}

        </div>

        <div style="background: linear-gradient(135deg, #212121 0%, #424242 100%); padding: 32px 24px; text-align: center; color: white;">
          <div style="font-size: 24px; font-weight: bold; margin-bottom: 8px;">⛳ Chip Anna Putt</div>
          <div style="font-size: 14px; opacity: 0.8;">Master Your Short Game</div>
        </div>

      </div>
    </div>
  `,

  review: (data: any) => `
    <div style="font-family: system-ui, sans-serif, Arial; font-size: 14px; color: #212121; background-color: #f5f5f5; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background-color: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        
        <div style="background: linear-gradient(135deg, #2eaf4f 0%, #1a7f37 100%); padding: 40px 24px; text-align: center;">
          <h1 style="color: white; font-size: 28px; margin: 0 0 8px 0; font-weight: bold;">New Review Received! ⭐</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 16px;">A customer left feedback</p>
        </div>

        <div style="padding: 32px 24px;">
          
          <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 24px; border-radius: 12px; margin-bottom: 24px; border-left: 4px solid #059c17;">
            <h2 style="margin: 0 0 20px 0; font-size: 20px; color: #059c17;">Customer Information</h2>
            
            <div style="padding: 16px; background-color: white; border-radius: 8px; margin-bottom: 12px;">
              <div style="font-size: 12px; color: #6c757d; text-transform: uppercase; margin-bottom: 4px;">Name</div>
              <div style="font-size: 18px; font-weight: 600;">${data.name}</div>
            </div>

            <div style="padding: 16px; background-color: white; border-radius: 8px;">
              <div style="font-size: 12px; color: #6c757d; text-transform: uppercase; margin-bottom: 4px;">Email</div>
              <div style="font-size: 18px; font-weight: 600;">
                <a href="mailto:${data.email}" style="color: #059c17; text-decoration: none;">${data.email}</a>
              </div>
            </div>
          </div>

          <div style="background-color: white; border: 2px solid #e9ecef; border-radius: 12px; padding: 24px; margin-bottom: 20px; text-align: center;">
            <h3 style="font-size: 18px; margin-top: 0; color: #666;">Rating</h3>
            <div style="font-size: 32px; color: #2eaf4f; font-weight: bold; margin-bottom: 10px;">
              ${data.rating} / 5
            </div>
            <div style="font-size: 40px; color: #ffc002; margin-top: 10px;">
              ${'★'.repeat(data.rating)}${'☆'.repeat(5 - data.rating)}
            </div>
          </div>

          <div style="background-color: white; border: 2px solid #e9ecef; border-radius: 12px; padding: 24px; margin-bottom: 20px;">
            <h3 style="margin: 0 0 16px 0; font-size: 18px; color: #666;">Review</h3>
            <p style="font-size: 16px; line-height: 1.6; color: #212121; white-space: pre-wrap; margin: 0;">${data.review}</p>
          </div>

          ${data.videoUrl ? `
          <div style="background-color: white; padding: 20px; border-radius: 12px; margin-bottom: 20px; border: 2px solid #e9ecef;">
            <h3 style="font-size: 18px; margin-top: 0; color: #666;">Video Review 🎥</h3>
            <p style="margin-bottom: 10px;"><strong>YouTube URL:</strong></p>
            <a href="${data.videoUrl}" target="_blank" style="display: inline-block; background-color: #2eaf4f; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
              Watch Video Review →
            </a>
            <p style="font-size: 13px; color: #666; margin-top: 10px; word-break: break-all;">${data.videoUrl}</p>
          </div>
          ` : ''}

        </div>

        <div style="background: linear-gradient(135deg, #212121 0%, #424242 100%); padding: 32px 24px; text-align: center; color: white;">
          <div style="font-size: 24px; font-weight: bold; margin-bottom: 8px;">⛳ Chip Anna Putt</div>
        </div>

      </div>
    </div>
  `,

  waitlist: (data: any) => `
    <div style="font-family: system-ui, sans-serif, Arial; font-size: 14px; color: #212121; background-color: #f5f5f5; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background-color: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        
        <div style="background: linear-gradient(135deg, #059c17 0%, #048a14 100%); padding: 40px 24px; text-align: center;">
          <div style="background-color: rgba(255,255,255,0.1); width: 80px; height: 80px; border-radius: 50%; margin: 0 auto 16px; font-size: 40px; display: flex; align-items: center; justify-content: center;">
            🎯
          </div>
          <h1 style="color: white; font-size: 28px; margin: 0 0 8px 0; font-weight: bold;">New Waitlist Signup!</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 0; font-size: 16px;">Someone wants to join the community</p>
        </div>

        <div style="padding: 32px 24px;">
          
          <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 24px; border-radius: 12px; margin-bottom: 24px; border-left: 4px solid #059c17;">
            <h2 style="margin: 0 0 20px 0; font-size: 20px; color: #059c17;">Contact Information</h2>
            
            <div style="padding: 16px; background-color: white; border-radius: 8px;">
              <div style="font-size: 12px; color: #6c757d; text-transform: uppercase; margin-bottom: 4px;">Email Address</div>
              <div style="font-size: 18px; font-weight: 600;">
                <a href="mailto:${data.email}" style="color: #059c17; text-decoration: none;">${data.email}</a>
              </div>
            </div>
          </div>

          <div style="background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%); padding: 16px 20px; border-radius: 8px; border-left: 4px solid #059c17;">
            <div style="font-weight: 600; color: #1b5e20; margin-bottom: 4px;">🎉 New Member!</div>
            <div style="font-size: 14px; color: #2e7d32;">Add this email to your mailing list and event notifications.</div>
          </div>

        </div>

        <div style="background: linear-gradient(135deg, #212121 0%, #424242 100%); padding: 32px 24px; text-align: center; color: white;">
          <div style="font-size: 24px; font-weight: bold; margin-bottom: 8px;">⛳ Chip Anna Putt</div>
        </div>

      </div>
    </div>
  `
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { type, ...data } = body

    // Validate type
    if (!['contact', 'lessons', 'review', 'waitlist'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid form type' },
        { status: 400 }
      )
    }

    // Get appropriate template
    const template = templates[type as keyof typeof templates]
    const html = template(data)

    // Subject lines
    const subjects = {
      contact: `New Contact: ${data.name}`,
      lessons: `New Lesson Request: ${data.name}`,
      review: `New Review: ${data.rating}⭐ from ${data.name}`,
      waitlist: `New Waitlist Signup: ${data.email}`
    }

    const result = await resend.emails.send({
      from: 'Chip Anna Putt <onboarding@resend.dev>',
      to: ['sales@increasecompany.com'],
      subject: subjects[type as keyof typeof subjects],
      html,
    })

    return NextResponse.json({ success: true, id: result.data?.id })
  } catch (error) {
    console.error('Email send error:', error)
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    )
  }
}