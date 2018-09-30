// Google Map
let map;

// Markers for map
let markers = [];

// Info window
let info = new google.maps.InfoWindow();


// Execute when the DOM is fully loaded
$(document).ready(function() {

    // Styles for map
    // https://developers.google.com/maps/documentation/javascript/styling
    let styles = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#1d2c4d"
      }
    ]
  },
  {
    elementType: "labels",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8ec3b9"
      }
    ]
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1a3646"
      }
    ]
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#4b6878"
      }
    ]
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#64779e"
      }
    ]
  },
  {
    featureType: "administrative.neighborhood",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "administrative.province",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#4b6878"
      }
    ]
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#334e87"
      }
    ]
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [
      {
        color: "#023e58"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#283d6a"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#6f9ba5"
      }
    ]
  },
  {
    featureType: "poi",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1d2c4d"
      }
    ]
  },
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#023e58"
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off"
      }
    ]
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#3C7680"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#304a7d"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#98a5be"
      }
    ]
  },
  {
    featureType: "road",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1d2c4d"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#2c6675"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#255763"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#b0d5ce"
      }
    ]
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#023e58"
      }
    ]
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#98a5be"
      }
    ]
  },
  {
    featureType: "transit",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1d2c4d"
      }
    ]
  },
  {
    featureType: "transit.line",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#283d6a"
      }
    ]
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#3a4762"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#0e1626"
      }
    ]
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#4e6d70"
      }
    ]
  }
];
    // Options for map
    // https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    let options = {
        center: {lat: 50.45466, lng: 30.5238}, // Kiev, Ukraine
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        maxZoom: 14,
        panControl: true,
        styles: styles,
        zoom: 13,
        zoomControl: true
    };

    // Get DOM node in which map will be instantiated
    let canvas = $("#map-canvas").get(0);

    // Instantiate map
    map = new google.maps.Map(canvas, options);

    // Configure UI once Google Map is idle (i.e., loaded)
    google.maps.event.addListenerOnce(map, "idle", configure);

});


// Add marker for place to map
function addMarker(place)
{
    var myLatLng = new google.maps.LatLng(place["latitude"], place["longitude"]);

    var image =
    {
        url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAe0SURBVGhD1VlbbFVFFK3vZ3xFjTFqNPFHY+KHX0a//NBojP5ojH6oiQHlnnNvKS0FxEiCL+S+H+3l3nvOnLZaq1UUQXxAkYcgUEFABUVE44OnigUU5OW41tw5taVzrpQW2q5kpefOzNl7z+w9e/acVg0m4jVvnBO3vQdjtsjj74qY5e2M2d5BMm6LHbqtIRp2H+BY/drwQbLauyhuiZdhaBcoE5Z3pBgRXa3VYs871c5eks9sQ/8RjlFjLe8FvqvFDB1klTwlars1WOXfaVxrxN3TWefIrRML8vcAbp1QlBzTWu3s1hP6Fd4KUZYWe3IRrW05Dys6k8aIsPvn1+NLRsMrccP4ohQRdy9lIBzbTnq4pcPuZVC8Bvyno6Z02GRkfzi/xjlEWZhQZ7ymdIlWc/xIh9NnFUYXztA/jZgypf3MmCWWJixxeHVd/70QxFWQRZnw8oL2B9tP0+qMYDS8NKb1Yv2zLyikHLNeNB4qXa+bewGb2mMoLK8dvEn4/LSuRK9I7LmsVtcLcdu9Gf2NWMjdsONz3dwXUVvcASFLlDDlavGk7lKAgLvYN7fGOaZw4qbfNsHcF8Q5Y91DSn/IvV2rVYjbTY+yHYt9BJN4P2F7t+muYCDP34jc/2Is0nSLbkJITTkVk1ybtcXBHQYDfP4G0ltN1YIZSTbXC7nbbZQ7Y3k5u8aRa+uKxvd8bgeh4wAW8tOemazsDfEM0vW1uun4ELPdh2kY3G80gPwFqbW52lUTKD3tykXNefnL8ow8sDkpd69PSXeyo/rax7oVPbUMC8FxiZC4X6sfPGA1FmZscehXg2KS50MpImQKXDWzQf79XVJNYP+mMtUz2la2N8pE2JMdOEtMckjqyFiCITZHqx8cMEMwNmfVuEbF5JtYZcSt/LYjp4z+Zl5OvvIcPACjyVefd+TG+eW+bZ+l5a65OaMcn7PGOv9gTx5khtJmDBwxy72Xrl4TEFbf1pdDYZ5TUIauwKrz94z6ovwgHVfkM9tWtufVGLIr22iURzK1c3wi3HSnNmPgQJaYQKE/wBiT0g/hKfb/tiatVjsR8WTbcznZ9cl4+deKcYp8ZlsS3tneWd437gQ3MI1/ryfOEkibURnldCt29ab3U2yMuFoP4f7IUCgziklpCzJUaZKrjOMG59itHRO7J+Fzy/yJqm9xS9krhYmufA8haZK5HXuOYxHSCW1GFW2ibUfbyznASK8WPwq96aVyodz5+n2eH8WUJY6YFJLc5G0vOcq42ZmizI1z+kzCJ/s4hmP5DveWSSaZUpWyKGgzqmgTbTPYW6uHVAZyehIvqDPCpNCDR8Sz5YnMc2aorPTHkv/CyucutMXDonsvOZNd+U7ARJi5YGAvjwwYmMQzFMpzwqR0Foxh7Hd9mZabF2aVAR9lY30mwjb2bV6UlbvWpdSEF8FDJpk/doeWmKTNGDh4MFHouoBSndmM/cvayrH/bra8mm9Ny8h1bVMV+cy22ejjGO4TpuUfAhbHz1rMmNqMgWN6yLuCtde8gNVjGDjYJ5mxQm5dmZH7NqXkAi+vDkcaQ6aqPbmwKa8Oxx+XZlTfzArn0lz0USevDNqMwUEC948ClJuUkhtxSUoh/hvqhAovrvqeDSkVRiSf2caDMjdOyDz2VVCocmEaIAtX5k6tvv/QmWEU+AkEPaWbmbnquLLrYbBJOfkV+nLaC29ML8nVsxrUJL5fnJWr3m6Ur08rh0sRk9gccCaRa3VYgRGtntn1CaTZRfg7qmdGNQLGVoPlu7TlfZm0mm/VXVWx0YVLcfE5wILPpNznTygG30eVm0H8a2O6yUl+iPD8v9K+VRWeYn/PDxPxkLgHNv1MOdrG7kn2AQZMh4CWoFofwgqspzZV8IpPHp5fYByr5U6c3uuRKHYeNcZEjlMTD7kZrbYbvDnGrKb7cMWYC1uLurn/4KbHXtnPFTMZMVDynGqKoPi0xL7oUy2Xa7UnBojTyVyxwbyv+1zhp1zbq9fqThymPOadnbTFtiLifWc/r7GVyFBsRKaC7C38CKLVnVggvz/ElQs6V46HTBCUyc+pWs3JQdISH3Djb8RdxGRYf8iPe5SVDIvBvREeC162nCsRBntdhpjBuGMlw5NVQdL29jCZaPEnF9iUjzMc5iMsTEYeC/mu3uCPa7FDg6Ttdqi7eoWTOog8j1RIQYYWN3RIRZqvSVrePtHPEGM9xXsMQuqvaeHiVVrc0ALVgM3w6OhHFltYWw4pcJQWM/TgV8iE7XZiddVHA5PhPck7CMemwt6SIfu/SBCSY5pvgGcOv4ZwMRnfk6+j8MTeOBC1W67Trw8v8H7NcKlUvvi3SZxDU/Vrww8su1FU/jEDJbypfGEyKEQQUrbYURhdOFe/NjwRC7ljuOJLsZmPnsgyf4Nb4hE9fPiCdwas+KY8CsCeXuFzHik6bXlrh90GD4L/L4ieXuEz26J209162PAH0vHpSK1b+AXSn0gJHsra4js9ZOQgEfHq6YFvUNmSfO75MWPEgFdVZLDD76EoJHEAHkyHX7lAd48sNNpiVQ6eIGfY7nLdPPKQUV/6y5+CsmHX0s0jD9GIc5M/kaD/248I8ExBKXKI+4OFpW4emYhZ4mNS/xy5mDa6cCGpf54gVFX9CxaZuPKvK7u9AAAAAElFTkSuQmCC',
        size: new google.maps.Size(32, 38),
        scaledSize: new google.maps.Size(32, 38),
        labelOrigin: new google.maps.Point(20, -10)
    }
    var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: place["place_name"] +", "+ place["postal_code"],
    label: {text: place["place_name"] +", "+ place["postal_code"], color: "#b0d5ce"},
    icon : image,
    });

    // Read JSON ansver from /articles
    $.getJSON("/articles", {geo: place["place_name"]}, function(articles) {
        // If data is not empty
        if (!$.isEmptyObject(articles)) {
            var articlesContent = "<ul>";
            for (var i = 0; i < articles.length; i++) {
                articlesContent +='<li><a target="_new" href="' + articles[i].link + '">' + articles[i].title + "</a></li>";
            }
            articlesContent += "</ul>";
        }
        // On click event
        marker.addListener('click', function() {
            showInfo(marker, articlesContent);
        });


    });

    // add marker to the map markers
    markers.push(marker);

}


// Configure application
function configure()
{
    // Update UI after map has been dragged
    google.maps.event.addListener(map, "dragend", function() {

        // If info window isn't open
        // http://stackoverflow.com/a/12410385
        if (!info.getMap || !info.getMap())
        {
            update();
        }
    });

    // Update UI after zoom level changes
    google.maps.event.addListener(map, "zoom_changed", function() {
        update();
    });

    // Configure typeahead
    $("#q").typeahead({
        highlight: false,
        minLength: 1
    },
    {
        display: function(suggestion) { return null; },
        limit: 10,
        source: search,
        templates: {
            suggestion: Handlebars.compile(
                "<div>" +
                "{{place_name}}, {{admin_name1}}, {{postal_code}}" +
                "</div>"
            )
        }
    });

    // Re-center map after place is selected from drop-down
    $("#q").on("typeahead:selected", function(eventObject, suggestion, name) {

        // Set map's center
        map.setCenter({lat: parseFloat(suggestion.latitude), lng: parseFloat(suggestion.longitude)});

        // Update UI
        update();
    });

    // Hide info window when text box has focus
    $("#q").focus(function(eventData) {
        info.close();
    });

    // Re-enable ctrl- and right-clicking (and thus Inspect Element) on Google Map
    // https://chrome.google.com/webstore/detail/allow-right-click/hompjdfbfmmmgflfjdlnkohcplmboaeo?hl=en
    document.addEventListener("contextmenu", function(event) {
        event.returnValue = true;
        event.stopPropagation && event.stopPropagation();
        event.cancelBubble && event.cancelBubble();
    }, true);

    // Update UI
    update();

    // Give focus to text box
    $("#q").focus();
}


// Remove markers from map
function removeMarkers()
{
  markers.forEach(function(item) {
    item.setMap(null);
    google.maps.event.clearInstanceListeners(item);
  });

  markers = [];
}


// Search database for typeahead's suggestions
function search(query, syncResults, asyncResults)
{
    // Get places matching query (asynchronously)
    let parameters = {
        q: query
    };
    $.getJSON("/search", parameters, function(data, textStatus, jqXHR) {

        // Call typeahead's callback with search results (i.e., places)
        asyncResults(data);
    });
}


// Show info window at marker with content
function showInfo(marker, content)
{
    // Start div
    let div = "<div id='info'>";
    if (typeof(content) == "undefined")
    {
        // http://www.ajaxload.info/
        div += "<img alt='loading' src='/static/ajax-loader.gif'/>";
    }
    else
    {
        div += content;
    }

    // End div
    div += "</div>";

    // Set info window's content
    info.setContent(div);

    // Open info window (if not already open)
    info.open(map, marker);
}


// Update UI's markers
function update()
{
    // Get map's bounds
    let bounds = map.getBounds();
    let ne = bounds.getNorthEast();
    let sw = bounds.getSouthWest();

    // Get places within bounds (asynchronously)
    let parameters = {
        ne: `${ne.lat()},${ne.lng()}`,
        q: $("#q").val(),
        sw: `${sw.lat()},${sw.lng()}`
    };
    $.getJSON("/update", parameters, function(data, textStatus, jqXHR) {

       // Remove old markers from map
       removeMarkers();

       // Add new markers to map
       for (let i = 0; i < data.length; i++)
       {
           addMarker(data[i]);
       }
    });
};
