var stdin = exports;

/**
 * 行単位に処理するための標準入力管理用関数
 * @param {Function} callback_for_each_line 行ごとに呼ばれるコールバック関数
 * @param {Function} [callback_for_eof] EOF に到達したときに呼ばれるコールバック関数
 */
exports.gets = function (callback_for_each_line, callback_for_eof) {

  var fragment = "";
  var linenum = 0;

  process.stdin.on("data", function (chunk) {

    if (chunk === "") {
      return;
    }

    var lines = chunk.split("\n");
    lines[0] = fragment + lines[0];
    fragment = lines.pop();

    callback_for_each_line && lines.forEach(function (str) {

      callback_for_each_line(str, linenum);
      linenum = linenum + 1;

    });
  });

  process.stdin.on("end", function () {

    callback_for_each_line && callback_for_each_line(fragment, linenum);
    callback_for_eof && callback_for_eof();

  });

};

/**
 * CSV ファイルを読み込んで処理するための標準入力管理用関数
 * @param {Array} interpreters CSV の各列のデータを解釈するための関数が入った配列
 * @param {Function} callback_for_each_line 行ごとに呼ばれるコールバック関数
 * @param {Function} [callback_for_eof] EOF に到達したときに呼ばれるコールバック関数
 */
exports.csv = function (interpreters, callback_for_each_line, callback_for_eof) {

  stdin.gets(function (buf, linenum) {

    var csv = buf.split(",");
    if (csv.length > 0) {
      csv.map(function (e, i) {
        return typeof interpreters[i] === "function" ? interpreters[i](e) : e;
      });
      callback_for_each_line(csv, linenum);
    }

  }, callback_for_eof);

};
