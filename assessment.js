// 1 診断結果のパターンのデータが取得できる
// 2 名前を入力すると診断結果が出力される関数
// i 入力が同じ名前なら、同じ診断結果を出力する処理
// ii 診断結果の文章のうち名前の部分を、入力された名前に置き換える処理

//厳格モード
'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButtuon = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子をすべて削除する
 * @param {HTMLElement} element HTML要素
 */
function removeAllChildren(element){
    //// nullだとfalse
    while (element.firstElementChild){
        //// 子どもの要素がある限り、削除
        element.removeChild(element.firstElementChild);
    }
}

userNameInput.onkeydown= event=>{
    if(event.key ==='Enter'){
        assessmentButtuon.onclick();
    }
}

// assessmentButtuon.onclick = function(){
    // console.log('pushd!!!Button')
// }
//アロー関数：ES6
assessmentButtuon.onclick = () => {
    // console.log('pushd!!!Button')
    const userName = userNameInput.value;
    // console.log(`input:  ${userName}`);
    if(userName.length === 0){
        return;
    }
    //TODO: 診断表示エリアの作成
    removeAllChildren(resultDivided);

    
    const header = document.createElement('h3');
    header.innerText = '診断結果';
    resultDivided.appendChild(header);

    const paragraph =document.createElement('p');
    const result = assessment(userName);
    paragraph.innerText = result;
    resultDivided.appendChild(paragraph);

    //TODO: ツイートエリアの作成
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    const refValue = 
        'https://twitter.com/intent/tweet?button_hashtag=' +
        encodeURIComponent('あなたのいいところ') +
        '&ref_src=twsrc%5Etfw';
    anchor.setAttribute('href',refValue);
    anchor.className = 'twitter-hashtage-button';
    anchor.setAttribute('data-text',result);
    anchor.innerText = 'Tweet #あなたのいいところ';

    tweetDivided.appendChild(anchor);

}

const answers=[
'{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
'{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
'{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
'{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
'{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
'{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
'{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
'{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
'{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
'{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
'{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
'{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
'{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
'{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
'{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
'{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
'{userName}のいいところは優しさです。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒やされています。' 
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザの名前
 * @return {string} 診断結果
 */
function assessment(userName){
      //全文字のコード番号を取得して足し合わせる
    let sumOfCharCode = 0;
    for(let i =0; i<userName.length;i++){
        sumOfCharCode=sumOfCharCode+userName.charCodeAt(i);
    }
    //文字列のコード番号の合計を回答の数で割って、添字の数値を求める。
    const index = sumOfCharCode% answers.length;
    let result =answers[index];
    result=result.replace(/\{userName\}/g , userName) ;
    return result;
}


console.log(assessment('太郎'));
console.log(assessment('次郎'));
console.log(assessment('太郎'));

//test
// console.assert(
    // assessment('太郎') ===
    // '太郎のいいところは決断力です。郎がする決断にいつも助けられる人がいます。',
//   '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
// );
