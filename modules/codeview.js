/**
 * 
 * @param {string} url 출력하고자하는 사이트 주소
 * @param {string} element 출력할 대상의 id(이름)
 * @param {string} deleteType 출력시 삭제하고자하는 문자열 타입(예:comment)
 */

function readSrcCode(url, element, deleteType = "emptyline") {
  var rawFile = new XMLHttpRequest();
  var target = document.getElementById(element);
  rawFile.open("GET", url, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        let text = rawFile.responseText;
        target.innerHTML = editText(text.replace(/</g, "&lt;"), deleteType); // html 출력용
      }
    }
  }
  rawFile.send(null);
}

/**
 * 
 * @param {string} text 원문
 * @param {string} deleteType {
 *    comment : 주석제거
 *    emptyline : 공백라인 제거
 * 
 * @returns 변경된 텍스트
 */
function editText(text, deleteType) {
  if (deleteType.match("comment") != null) {
    text = text.replace(/\/\*(.|[\r\n])*\*\//g, "\n"); // 주석 제거
    text = text.replace(/\/\/(.)*/g, ""); // 주석 제거

    console.log(1);
  }

  if (deleteType.match("package") != null) {
    console.log(1);
    text = text.replace(/package(.)*/g, "");
  }

  if (deleteType.match("import") != null) {
    console.log(1);
    text = text.replace(/import(.)*/g, "");
  }

  // 연속된 줄바꿈을 하나의 줄바꿈으로 바꾼다. 반복한다.
  if (deleteType.match("emptyline") != null) {
    var new_text = "";
    while (true) {
      new_text = text.replace(/\n[ \r\t]*\n/g, "\n"); // 공백 라인제거
      if (new_text == text) {
        break;
      } else {
        text = new_text;
      }
    }
  }

  // trim
  // 앞 빈줄 삭제
  text = text.substring(text.match(/[a-zA-Z0-9\/]/).index);
  // 뒷 줄 제거
  var i = text.length - 1;
  while (i > 0) {
    if ((text[i] == '\n') ||
      (text[i] == '\r') ||
      (text[i] == '\t') ||
      (text[i] == ' ')) {
      i--;
    } else {
      break;
    }
  }
  text = text.substring(0, i + 1);
  return text;
}