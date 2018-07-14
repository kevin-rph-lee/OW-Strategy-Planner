$(() => {

  //TODO FIgure this shit out
  $('.delete-plan').on('click', function(event) {
    console.log($(this).data('id'));

    $.ajax({
      url: '/plans/delete/' + $(this).data('id'),
      method: 'POST'
    }).done((id) => {
      location.reload();
    })
  })

});
