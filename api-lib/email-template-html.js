
const print_paragraphs = (paragraphs) => {
    return paragraphs.map((paragraph) => {
        return `<p style="font-size:16px;color:#555555;">${paragraph}</p>`
    })
}

export default ({ title, content_paragraphs, signoff, assets_domain }) => {

    return (`<div style="max-width: 600px; padding: 20px; background: #FFFFFF; border-radius: 5px; margin: 40px auto; font-family: Open Sans,Helvetica,Arial; font-size: 15px; color: #666;">
        <div style="color: #444444; font-weight: normal;">
            <div style=" padding: 10px 0; border-bottom: solid 3px #EEEEEE;">

                <img style="margin-bottom: 20px; margin-left: 38px;" src="${assets_domain}/html-email-assets/bidstacker-logo.jpg" alt="logga.bidstacker" width="250" height="51" />

                <div style="position: relative; padding-top: 33px; padding-left:62px; background-repeat: no-repeat; background-color: #f9b300; width:100%; min-height:100px; background-image:url(${assets_domain}/html-email-assets/header-angle.jpg); background-position: bottom; background-size: 100% auto;">
                    <p style="margin: 0;font-size:24px;font-weight:600;padding-right: 20px;line-height:30px;color:#333333;font-family:Open Sans,Helvetica,Arial;">${title}</p>
                </div>
            
                <div style="margin-left: 62px;margin-right: 63px; font-weight: 600; font-family:Open Sans,Helvetica,Arial; line-height:26px;">
                    ${print_paragraphs(content_paragraphs)}
                    <p style="font: size 16px;px;color:#555555;margin-top:20px;">${signoff}</p>
                    <a target="_blank" style="text-align:center;width: 130px; position: relative;display: block;background: #f9b300; color: #333; margin: 15px 0;  padding: 12px 30px; text-decoration: none; border-radius: 4px; letter-spacing: 0.3px;" href="https://bidstacker.se/">
                    Till startsidan
                    </a>
                </div>

                <div style="position: relative;padding-top: 52px;padding-left:62px; padding-bottom: 30px;background-repeat: no-repeat;width:100%;min-height: 110px;background-image:url(${assets_domain}/html-email-assets/footer-angle.jpg);background-size: 100% auto; background-color:#524034;">
                    <p style="margin: 15px 0 0 0;font-size:16px;font-weight:400;padding-right: 20px;line-height:28px;color:#ffffff;font-family:Open Sans,Helvetica,Arial;">
                        <strong style="color:#FFFFFF;">Hemsida: </strong><span style="color:#f9b300;">https://bidstacker.se</span>
                    </p>
                    <p style="margin: 0;font-size:16px;font-weight:400;padding-right: 20px;line-height:28px;color:#ffffff;font-family:Open Sans,Helvetica,Arial;">
                        <strong style="color:#FFFFFF;">Kundtjänst: </strong><span style="color:#f9b300;">kundservice@bidstacker.se</span>
                    </p>
                    <p style="margin: 18px 0 8px 0;font-size:16px;font-weight:400;padding-right: 20px;line-height:28px;color:#ffffff;font-family:Open Sans,Helvetica,Arial;">
                        Besök oss på våra sociala medier
                    </p>
                    <div style="display:inline;position:relative;width: 52px;height: 52px;">
                        <a style="text-decoration:none;" target="_blank" href="https://www.linkedin.com/company/bidstacker-se">
                            <img width="52" height="52" src="${assets_domain}/html-email-assets/non-social-media-linkedin.jpg" alt="linkedin" />
                        </a>
                        <a style="text-decoration:none;" target="_blank" href="https://www.facebook.com/bidstacker">
                            <img width="52" height="52" src="${assets_domain}/html-email-assets/non-social-media-fb.jpg" alt="fb" />
                        </a>
                        <a style="text-decoration:none;" target="_blank" href="https://www.instagram.com/bidstacker">
                            <img width="52" height="52" src="${assets_domain}/html-email-assets/non-social-media-insta.jpg" alt="instagram" />
                        </a>
                        <a style="text-decoration:none;" target="_blank" href="https://twitter.com/bidstacker">
                            <img width="52" height="52" src="${assets_domain}/html-email-assets/non-social-media-twitter.jpg" alt="twitter" />
                        </a>
                    </div>

                    <p style="margin:18px 0 18px 0;font-size:13px;font-weight:400;padding-right: 20px;line-height:28px;color:#ffffff;font-family:Open Sans,Helvetica,Arial;">
                        Ser e-post meddelandet konstigt ut? Eller stämmer inte något annat i mejlet, kontakta vår kundtjänst - info@bidstacker.se
                    </p>
                </div>
                
            </div>
        
        </div>
    </div>`)
}