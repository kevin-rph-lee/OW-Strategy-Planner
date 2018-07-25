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

  $('.map-filter-button').on('click', function(event) {
    const mapID = $(this).data('id');
    $('.cards-container').empty();


    if( $(this).data('id') === 'Hybrid' || $(this).data('id') === 'Assault' || $(this).data('id') === 'Control' || $(this).data('id') === 'Escort'){
      for(let i = 0; i < plans.length; i ++){

        if(plans[i].type === mapID ){

          if( typeof userID.id === null|| plans[i].owner_id !== userID.id){

            $('.cards-container').append(`

              <div class="col-sm-4 col-xs-12">
                <div class="card">
                  <div class="card-header">
                    <div class="media">
                      <a href="/plans/${plans[i].id}"><img src= ${plans[i].icon}></a>
                      <div class="media-body">
                        <h5 class="mt-0"><strong> ${plans[i].name}</strong></h5>
                        <div>Map: ${plans[i].map_name} </div>
                        <div>Type: ${plans[i].type}</div>
                      </div>
                    </div>
                  </div>
                  <div class="card-body">
                    <p class="card-text">${plans[i].description}</p>
                    <div class = "button-container">
                      <a href="/plans/${plans[i].id}"   class="btn btn-primary">View Plan</a>
                    </div>
                  </div>
                  <div class="card-footer">
                    <div>Owner: ${plans[i].email}</div>
                    <div>Created: ${plans[i].created_datetime}</div>
                    <div>Updated: ${plans[i].updated_datetime}</div>
                  </div>
                </div>
              </div>
              `)

          } else {

            $('.cards-container').append(`

              <div class="col-sm-4 col-xs-12">
                <div class="card">
                  <div class="card-header">
                    <div class="media">
                      <a href="/plans/${plans[i].id}"><img src= ${plans[i].icon}></a>
                      <div class="media-body">
                        <h5 class="mt-0"><strong> ${plans[i].name}</strong></h5>
                        <div>Map: ${plans[i].map_name} </div>
                        <div>Type: ${plans[i].type}</div>
                      </div>
                    </div>
                  </div>
                  <div class="card-body">
                    <p class="card-text">${plans[i].description}</p>
                    <div class = "button-container">
                      <a href="/plans/${plans[i].id}"   class="btn btn-primary">View Plan</a>
                      <button type="button" class="btn btn-warning delete-plan" data-id="${plans[i].id}">Delete Plan</button>
                    </div>
                  </div>
                  <div class="card-footer">
                    <div>Owner: ${plans[i].email}</div>
                    <div>Created: ${plans[i].created_datetime}</div>
                    <div>Updated: ${plans[i].updated_datetime}</div>
                  </div>
                </div>
              </div>
              `)
          }

        }

      }
    }

    if(isNaN( $(this).data('id') ) === false){
      for(let i = 0; i < plans.length; i ++){

        if(Number(plans[i].map_id) === mapID ){

          if( typeof userID.id === null|| plans[i].owner_id !== userID.id){

            $('.cards-container').append(`

              <div class="col-sm-4 col-xs-12">
                <div class="card">
                  <div class="card-header">
                    <div class="media">
                      <a href="/plans/${plans[i].id}"><img src= ${plans[i].icon}></a>
                      <div class="media-body">
                        <h5 class="mt-0"><strong> ${plans[i].name}</strong></h5>
                        <div>Map: ${plans[i].map_name} </div>
                        <div>Type: ${plans[i].type}</div>
                      </div>
                    </div>
                  </div>
                  <div class="card-body">
                    <p class="card-text">${plans[i].description}</p>
                    <div class = "button-container">
                      <a href="/plans/${plans[i].id}"   class="btn btn-primary">View Plan</a>
                    </div>
                  </div>
                  <div class="card-footer">
                    <div>Owner: ${plans[i].email}</div>
                    <div>Created: ${plans[i].created_datetime}</div>
                    <div>Updated: ${plans[i].updated_datetime}</div>
                  </div>
                </div>
              </div>
              `)

          } else {

            $('.cards-container').append(`

              <div class="col-sm-4 col-xs-12">
                <div class="card">
                  <div class="card-header">
                    <div class="media">
                      <a href="/plans/${plans[i].id}"><img src= ${plans[i].icon}></a>
                      <div class="media-body">
                        <h5 class="mt-0"><strong> ${plans[i].name}</strong></h5>
                        <div>Map: ${plans[i].map_name} </div>
                        <div>Type: ${plans[i].type}</div>
                      </div>
                    </div>
                  </div>
                  <div class="card-body">
                    <p class="card-text">${plans[i].description}</p>
                    <div class = "button-container">
                      <a href="/plans/${plans[i].id}"   class="btn btn-primary">View Plan</a>
                      <button type="button" class="btn btn-warning delete-plan" data-id="${plans[i].id}">Delete Plan</button>
                    </div>
                  </div>
                  <div class="card-footer">
                    <div>Owner: ${plans[i].email}</div>
                    <div>Created: ${plans[i].created_datetime}</div>
                    <div>Updated: ${plans[i].updated_datetime}</div>
                  </div>
                </div>
              </div>
              `)
          }

        }

      }
    }

    if($(this).data('id') === 'All'){
      for(let i = 0; i < plans.length; i ++){
        if( typeof userID.id === null|| plans[i].owner_id !== userID.id){



          $('.cards-container').append(`

            <div class="col-sm-4 col-xs-12">
              <div class="card">
                <div class="card-header">
                  <div class="media">
                    <a href="/plans/${plans[i].id}"><img src= ${plans[i].icon}></a>
                    <div class="media-body">
                      <h5 class="mt-0"><strong> ${plans[i].name}</strong></h5>
                      <div>Map: ${plans[i].map_name} </div>
                      <div>Type: ${plans[i].type}</div>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <p class="card-text">${plans[i].description}</p>
                  <div class = "button-container">
                    <a href="/plans/${plans[i].id}"   class="btn btn-primary">View Plan</a>
                  </div>
                </div>
                <div class="card-footer">
                    <div>Owner: ${plans[i].email}</div>
                    <div>Created: ${plans[i].created_datetime}</div>
                    <div>Updated: ${plans[i].updated_datetime}</div>
                </div>
              </div>
            </div>
            `)

        } else {

          $('.cards-container').append(`

            <div class="col-sm-4 col-xs-12">
              <div class="card">
                <div class="card-header">
                  <div class="media">
                    <a href="/plans/${plans[i].id}"><img src= ${plans[i].icon}></a>
                    <div class="media-body">
                      <h5 class="mt-0"><strong> ${plans[i].name}</strong></h5>
                      <div>Map: ${plans[i].map_name} </div>
                      <div>Type: ${plans[i].type}</div>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <p class="card-text">${plans[i].description}</p>
                  <div class = "button-container">
                    <a href="/plans/${plans[i].id}"   class="btn btn-primary">View Plan</a>
                    <button type="button" class="btn btn-warning delete-plan" data-id="${plans[i].id}">Delete Plan</button>
                  </div>
                </div>
                <div class="card-footer">
                    <div>Owner: ${plans[i].email}</div>
                    <div>Created: ${plans[i].created_datetime}</div>
                    <div>Updated: ${plans[i].updated_datetime}</div>
                </div>
              </div>
            </div>
            `)
        }

      }
    }




  })

});
