// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $.ajax("/burgers", {
      type: "GET"
    }).then(function(data) {
      var devouredElem = $("#devouredBurgers");
      var notDevouredElem = $("#notDevouredBurgers");
  
      var burgers = data.burgers;
      var len = burgers.length;
  
      for (var i = 0; i < len; i++) {
        var new_elem =
          "<li>" +
          burgers[i].id + 
          ". "+burgers[i].burger_name +
          "<button class='change-devoured' data-id='" +
          burgers[i].id +
          "' data-newdevour='" +
          !burgers[i].devoured +
          "'>";
  
        if (burgers[i].devoured) {
          new_elem += "RE-ORDER!";
        } else {
          new_elem += "EAT THE BURGER!";
        }
  
        new_elem += "</button>";
  
        // new_elem +=
        //   "<button class='delete-cat' data-id='" +
        //   cats[i].id +
        //   "'>DELETE!</button></li>";
  
        if (burgers[i].devoured) {
            devouredElem.append(new_elem);
        } else {
            notDevouredElem.append(new_elem);
        }
      }
    });
  
    $(document).on("click", ".change-devoured", function(event) {
      var id = $(this).data("id");
      var newDevour = $(this).data("newdevour")===true;
  
      var newDevourState = {
        devoured: newDevour
      };
  
      // Send the PUT request.
      $.ajax("/burgers/" + id, {
        type: "PUT",
        data: JSON.stringify(newDevourState),
        dataType:'json',
        contentType: 'application/json'
      }).then(function() {
        console.log("changed devour to", newDevour);
        // Reload the page to get the updated list
        location.reload();
      });
    });
  
    $(".create-form").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
  
      var newBurger = {
        burger_name: $("#ca")
          .val()
          .trim(),
        devoured: $("[name=devoured]:checked")
          .val()
          .trim()
      };
  
      // Send the POST request.
      $.ajax("/burgers", {
        type: "POST",
        data: JSON.stringify(newBurger),
        dataType:'json',
        contentType: 'application/json'
      }).then(function() {
        console.log("created new Burger");
        // Reload the page to get the updated list
        location.reload();
      });
    });
  

  });
  