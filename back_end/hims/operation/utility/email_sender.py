

class EmailSender():
    def send_email(email, application_id, copies):
        pass
        # msg = MIMEMultipart()
        # fromaddr = "rsrajuofficial@gmail.com"
        # toaddr = email
        # password = "fwhwqqlpllxszoei"
        # msg['From'] = fromaddr
        # msg['To'] = toaddr
        # msg['Subject'] = "Certified Copy: Application ID "+application_id
        # body = "Your Application ID "+application_id+" has been successfully approved. The certified copies have been digitally signed and is attached to this mail."
        # msg.attach(MIMEText(body, 'plain'))
        # s = smtplib.SMTP('smtp.gmail.com', 587)
        # s.starttls()
        # s.login(fromaddr, password)
        # text = msg.as_string()
        # s.sendmail(fromaddr, toaddr, text)
        # s.quit()