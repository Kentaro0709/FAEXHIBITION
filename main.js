$(function(){
  // ハンバーガーメニューをクリックした時
  $('.hamburger').on('click', function(){
    // ハンバーガーメニューの共通処理を呼び出す
    hamburger();
  });
  // メニューのリンクをクリックした時
  $('#navi a').on('click', function(){
    // ハンバーガーメニューの共通処理を呼び出す
    hamburger();
  });
  // スムーススクロール
  $('a[href^="#"]').click(function(){
    // リンクを取得
    let href = $(this).attr("href");
    // ジャンプ先のid名をセット
    let target = $(href == "#" || "" ? 'html' : href);
    // トップからジャンプ先の要素までの距離を取得
    let position = target.offset().top;
    // animateでスムーススクロールを行う
    $("html, body").animate({scrollTop:position}, 600, "swing");
    return false;
  });
  // フェード表示
  $(".inview").on("inview", function(event, isInView){
    if(isInView){
      // 要素（inviewクラス）が表示されたらshowクラスを追加する
      $(this).stop().addClass("show");
    }
  });
  // スクロール時のイベント
  $(window).scroll(function(){
    let scroll = $(window).scrollTop();
    // メインビジュアルの拡大・縮小
    mv_scale(scroll);
    // スクロール位置が520pxを超えた場合
    if(scroll > 520){
      // ロゴとハンバーガーメニューをfadeInで表示する
      $('.logo').fadeIn(500);
      $('.hamburger').fadeIn(500);
    } else {
      // ロゴとハンバーガーメニューをfadeOutで非表示にする
      $('.logo').fadeOut(500);
      $('.hamburger').fadeOut(500);
    }
    // サイドボタンを表示
    // 画面下から#galleryまでの距離を取得
    let gallery_position = $('#gallery').offset().top - $(window).height();
    // 画面下から#accessまでの距離を取得
    let access_position = $('#access').offset().top - $(window).height();

    // window.innerWidthで画面幅を取得
    // PC表示の場合の処理（画面幅が900pxより大きい場合）
    if(window.innerWidth > 900){
      // #galleryが表示された場合（スクロール位置が、画面下から#galleryまでの距離を超えた場合）
      if(scroll > gallery_position){
        // #accessが表示されるまでの間は、#side-btnを横からスライドさせて表示する
        if(scroll < access_position){
          $('#side-btn').css({
            'transform': 'rotate(-90deg) translateY(0)'
          });
          // #accessが表示されたら、#side-btnをスライドさせて非表示にする
        } else {
          $('#side-btn').css({
            'transform': 'rotate(-90deg) translateY(60px)'
          });
        }
        // #galleryが表示前は、#side-btnをスライドさせて非表示にする
      } else {
        $('#side-btn').css({
          'transform': 'rotate(-90deg) translateY(60px)'
        });
      }
    }
    // Accessの背景画像を表示
    // 画面下から#contactまでの距離を取得
    let contact_position = $('#contact').offset().top - $(window).height();
    // #accessが表示された場合
    if(scroll > access_position){
      // #contactが表示されるまでの間は、背景画像をfadeInで表示する
      if(scroll < contact_position){
        $('.bg').fadeIn(500);
      } else {
        $('.bg').fadeOut(500);
      }
      // #accessが表示される前の場合
    } else {
      $('.bg').fadeOut(500);
    }
  });
  // 画面読み込み時と画面幅変更時のイベント
  $(window).on('load resize', function(){
    // スクロール位置を取得
    let scroll = $(window).scrollTop();
    // メインビジュアルの拡大・縮小
    mv_scale(scroll);
  });
});
  function hamburger(){
    $('.hamburger').toggleClass('active');
    if($('.hamburger').hasClass('active')){
      // hamburgerクラスにactiveクラスが存在する場合は、naviにもactiveクラスを追加する
      $('#navi').addClass('active');
    } else {
      // hamburgerクラスにactiveクラスが存在しない場合は、naviからactiveクラスを削除する
      $('#navi').removeClass('active');
    }
  }
  function mv_scale(scroll){
    if(innerWidth > 900){
      // メインビジュアルのcss(width)を変更する
      // widthの値をスクロール値に合わせて増やすことで画像を拡大させる
      $('#mainvisual img').css({
        'width':  100/3 + scroll/10 + '%'
      });
      // スマホ表示の場合の処理
    } else {
      $('#mainvisual img').css({
      // メインビジュアルのcss(width)を変更する
      // widthの値をスクロール値に合わせて減らすことで画像を縮小させる
        'width': 100 - scroll/10 + '%'
      });
    }
  }
