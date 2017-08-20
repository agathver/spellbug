$(function() {
  let dictionary;
  $.getJSON('public/dictionary.json', function(data) {
    dictionary = new Set(data.commonWords.map( x => x.toLowerCase() ));
  });

  $('#check-btn').click(() => {
    const text = $('#text').val();
    const result = [];
    let errors = 0;
    const wrapperLen = 27;

    let lastIndex = 0;
    let match;
    const regex = /\W+/gi;
    while((match = regex.exec(text)) !== null) {
      let word = text.substring(lastIndex, regex.lastIndex - match[0].length);
      lastIndex = regex.lastIndex;

      if(!dictionary.has(word.toLowerCase())) {
        word = `<span class="error">${word}</span>`;
      }

      result.push(word, match[0]);
    }

    let lastWord = text.substring(lastIndex);
    if (!dictionary.has(lastWord)) {
      lastWord = `<span class="error">${lastWord}</span>`;
    }
    result.push(lastWord);

    $('#result').html(result.join('').trim());
  });

  $('#add-btn').click(() => {
    console.log($('#word').val().toLowerCase().trim());
    dictionary.add($('#word').val().toLowerCase().trim());

    $('#add-to-dict').modal('hide');
  })
});
