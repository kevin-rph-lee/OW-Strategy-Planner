$(() => {


  //Click to delete the plan
  $('.delete-plan').on('click', function(event) {
    //TODO: Figure out why ES6 doesn't work here properly...
    $.ajax({
      url: '/plans/delete/' + $(this).data('id'),
      method: 'POST'
    }).done((id) => {
      location.reload();
    })
  })

  //Filters out the different plans depending on what filter button is clicked
  $('.map-filter-button').on('click', function(event) {
    const mapID = $(this).data('id');
    //Empty out all of the cards
    $('.cards-container').empty();

    //Filter by map category
    if ( $(this).data('id') === 'Hybrid' || $(this).data('id') === 'Assault' || $(this).data('id') === 'Control' || $(this).data('id') === 'Escort'){
      for (let i = 0; i < plans.length; i ++) {
        if (plans[i].type === mapID ) {
          //If owner, show delete plan button
          if (typeof userID.id === null|| plans[i].owner_id !== userID.id){
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
                    <div>Owner: ${plans[i].username}</div>
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
                    <div>Owner: ${plans[i].username}</div>
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

    //Filter by specific map
    if (isNaN( $(this).data('id') ) === false) {
      for (let i = 0; i < plans.length; i ++) {
        if (Number(plans[i].map_id) === mapID ) {
          //If owner, show delete plan button
          if ( typeof userID.id === null|| plans[i].owner_id !== userID.id) {
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
                    <div>Owner: ${plans[i].username}</div>
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
                    <div>Owner: ${plans[i].username}</div>
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

    //Remove filters
    if ($(this).data('id') === 'All') {
      for (let i = 0; i < plans.length; i ++) {
        //If owner, show delete plan button
        if ( typeof userID.id === null|| plans[i].owner_id !== userID.id) {
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
                    <div>Owner: ${plans[i].username}</div>
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
                    <div>Owner: ${plans[i].username}</div>
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
