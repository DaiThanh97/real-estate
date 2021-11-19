export class StringUtilities {
  static removeAccents(str: string) {
    let trimString = this.trim(str);
    trimString = trimString.normalize();
    if (!trimString) {
      return "";
    }
    const AccentsMap = [
      "aàảãáạăằẳẵắặâầẩẫấậ",
      "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
      "dđ",
      "DĐ",
      "eèẻẽéẹêềểễếệ",
      "EÈẺẼÉẸÊỀỂỄẾỆ",
      "iìỉĩíị",
      "IÌỈĨÍỊ",
      "oòỏõóọôồổỗốộơờởỡớợ",
      "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
      "uùủũúụưừửữứự",
      "UÙỦŨÚỤƯỪỬỮỨỰ",
      "yỳỷỹýỵ",
      "YỲỶỸÝỴ",
    ];
    for (let i = 0; i < AccentsMap.length; i++) {
      const re = new RegExp("[" + AccentsMap[i].substr(1) + "]", "g");
      const char = AccentsMap[i][0];
      trimString = trimString.replace(re, char);
    }
    return trimString;
  }

  static trim(string: string) {
    if (!string) {
      return "";
    }
    const stringArray = string
      .trim()
      .split(" ")
      .filter((item) => !!item);
    return stringArray.join(" ");
  }

  static randomString(length: number) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  static randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
