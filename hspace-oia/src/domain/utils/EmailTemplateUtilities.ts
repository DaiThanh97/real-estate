export class EmailTemplateUtilities {
  static emailForEmployeeAccount(username: string, pass: string, url: string): { html: string, text: string, subject: string } {
    const html = "Tài khoản đăng nhập vào ứng dụng BDS của bạn:<br>" +
      `Tên đăng nhập: ${username}<br>` +
      `Mật khẩu: ${pass}<br>` +
      "<br>" +
      `Bạn có thể đăng nhập tại: ${url}<br>`;
    const text = "Tài khoản đăng nhập vào ứng dụng BDS của bạn:\n" +
      `Tên đăng nhập: ${username}\n` +
      `Mật khẩu: ${pass}\n` +
      "\n" +
      `Bạn có thể đăng nhập tại: ${url}\n`;
    return { html, text, subject: "Thông tin đăng nhập" };
  }

  static emailForCollaboratorAccount(username: string, pass: string): { html: string, text: string, subject: string } {
    const html = "Tài khoản đăng nhập vào ứng dụng BDS của bạn:<br>" +
      `Tên đăng nhập: ${username}<br>` +
      `Mật khẩu: ${pass}<br>` +
      "<br>" +
      "Bạn có thể tải ứng dụng tại:<br>" +
      "iOS: Link_appstore<br>" +
      "Android: Link_Google_play<br>";
    const text = "Tài khoản đăng nhập vào ứng dụng BDS của bạn:\n" +
      `Tên đăng nhập: ${username}\n` +
      `Mật khẩu: ${pass}\n` +
      "\n" +
      "Bạn có thể tải ứng dụng tại:\n" +
      "iOS: Link_appstore\n" +
      "Android: Link_Google_play\n";
    return { html, text, subject: "Thông tin đăng nhập" };
  }

  static emailForChangeIdentityName(username: string): { html: string, text: string, subject: string } {
    const html = `Tài khoản đăng nhập mới của bạn: ${username}<br>`;
    const text = `Tài khoản đăng nhập mới của bạn: ${username}\n`;
    return { html, text, subject: "Thay đổi tên đăng nhập" };
  }

  static emailForForgotPassword(code: string): { html: string, text: string, subject: string } {
    const html = `Tài khoản của bạn vừa được yêu cầu thết lập lại mật khẩu do quên mật khẩu. Mã xác thực là: ${code}.
                  <br/> Mã xác thực sẽ hết hiệu lực trong vòng 5 phút.`;
    const text = `Tài khoản của bạn vừa được yêu cầu thết lập lại mật khẩu do quên mật khẩu. Mã xác thực là: ${code}.
                  \n Mã xác thực sẽ hết hiệu lực trong vòng 5 phút.`;
    return { html, text, subject: "Quên mật khẩu" };
  }
}
