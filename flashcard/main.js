window.onload = function() {
    const en = document.getElementById('en');
    const ja = document.getElementById('ja');
    const bth = document.getElementById('bth');
    const total = document.getElementById('total');
    const table = document.getElementById('table');
    const deleteDataButton = document.getElementById('deleteDataButton');

    class Color {
        constructor(en, ja) {
            this.en = en;
            this.ja = ja;
            this.enClicked = false; // 単語のクリック状態
            this.jaClicked = false; // 意味のクリック状態
        }
        showInfo() {
            // クリックされているかでスタイルを変更
            let enColorStyle = this.enClicked ? 'style="color: red;"' : '';
            let jaColorStyle = this.jaClicked ? 'style="color: red;"' : '';
            return `<td ${enColorStyle}>${this.en}</td><td ${jaColorStyle}>${this.ja}</td>`;
        }
        // 単語がクリックされたときの処理
        handleEnClick() {
            this.enClicked = !this.enClicked; // クリック状態を反転させる
        }
        // 意味がクリックされたときの処理
        handleJaClick() {
            this.jaClicked = !this.jaClicked; // クリック状態を反転させる
        }
    }

    let colors = [];

    // ローカルストレージからデータを読み込む関数
    function loadFromLocalStorage() {
        const loadData = localStorage.getItem('colors');
        if (loadData !== null) {
            let jsonArr = JSON.parse(loadData);
            for (let i = 0; i < jsonArr.length; i++) {
                let color = new Color(jsonArr[i].en, jsonArr[i].ja);
                colors.push(color);
            }
            createTable();
        }
    }

    loadFromLocalStorage(); // ページ読み込み時にローカルストレージからデータを読み込む

    bth.addEventListener('click', () => {
        let newColor = new Color(en.value, ja.value);
        colors.push(newColor);
        en.value = '';
        ja.value = '';
        createTable();
        saveToLocalStorage(); // データが変更されたらローカルストレージに保存する
    });

    function createTable() {
        table.innerHTML = '<tr><th>VOCABULARY</th><th>MEANING</th><th>OPERATION</th></tr>';
        for (let i = 0; i < colors.length; i++) {
            let tr = document.createElement('tr');
            tr.innerHTML = `${colors[i].showInfo()}<td><button class="delete-btn"> <i class="fa-solid fa-trash"></i></button></td>`;
            let deleteBtn = tr.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', function() {
                colors.splice(i, 1);
                createTable();
                saveToLocalStorage();
            });
            let tds = tr.querySelectorAll('td');
            tds.forEach((td, index) => {
                td.addEventListener('click', function() {
                    if (index === 0) {
                        colors[i].handleEnClick(); // 英語の単語がクリックされた場合
                    } else if (index === 1) {
                        colors[i].handleJaClick(); // 日本語の意味がクリックされた場合
                    }
                    createTable();
                    saveToLocalStorage();
                });
            });
            table.appendChild(tr);
        }
        total.textContent = `TOTAL ${colors.length}`;
    }
    function saveToLocalStorage() {
        localStorage.setItem('colors', JSON.stringify(colors));
    }
};