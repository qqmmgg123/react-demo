Class Req {
    ajax: function(url, data, type, success, error) {
        var oMyForm = new FormData();

        for (var k in data) {
            oMyForm.append(k, data[k]);
        }

        function createXHR() {
            if (typeof XMLHttpRequest != "undefined") {
                return new XMLHttpRequest();
            }
        }

        var xhr = createXHR();

        function reqFailed(evt) {
            error.call(this, evt);
        }

        function reqComplete(evt) {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304) {
                    var data = JSON.parse(xhr.responseText);
                    success.call(this, data);
                    xhr.removeEventListener("load", reqComplete, false);
                }
            }
        }

        xhr.addEventListener("load", reqComplete);

        xhr.addEventListener("error", reqFailed);

        xhr.open(type, url, true);
        xhr.send(oMyForm);
    }
};

export default Req;
