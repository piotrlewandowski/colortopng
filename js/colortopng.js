document.body.style.overflow = "hidden";

window.onload = function() {
  document.getElementById( "preloader" ).style.display = "none";
  document.querySelector( ".page_wrapper" ).style.visibility = "visible";
  document.body.style.overflow = "auto";
}

/* ===== SOLID ===== */
var solid_canvas = document.getElementById( "solid_canvas" );
var solid_canvas_ctx = solid_canvas.getContext( "2d" );

var solid_save = document.getElementById( "solid_save" );
var solid_color_picker = document.getElementById( "solid_color_picker" );

var solid_width = document.getElementById( "solid_width" );
var solid_height = document.getElementById( "solid_height" );

var solid_w = 600;
var solid_h = 500;

solid_canvas.setAttribute( "width", solid_w );
solid_canvas.setAttribute( "height", solid_h );

solid_width.addEventListener( "change", function() {
  solid_w = this.value;
  solid_canvas.setAttribute( "width", solid_w );

  update( solid_color_picker.value );
}, false );

solid_height.addEventListener( "change", function() {
  solid_h = this.value;
  solid_canvas.setAttribute( "height", solid_h );

  update( solid_color_picker.value );
}, false );


solid_save.addEventListener( "click", function() {
  window.open( solid_canvas.toDataURL( "image/png" ) );
}, false );
/* ===== SOLID ===== */


/* ===== GRADIENT ===== */
var gradient_canvas = document.getElementById( "gradient_canvas" );
var gradient_canvas_ctx = gradient_canvas.getContext( "2d" );
var gradient_save = document.getElementById( "gradient_save" );

var color_picker1 = document.getElementById( "color_picker1" );
var color_picker2 = document.getElementById( "color_picker2" );

var gradient_w = 600;
var gradient_h = 500;

gradient_canvas.setAttribute( "width", gradient_w )
gradient_canvas.setAttribute( "height", gradient_h )

gradient_width.addEventListener( "change", function() {
  gradient_w = this.value;
  gradient_canvas.setAttribute( "width", gradient_w );

  update();
}, false );

gradient_height.addEventListener( "change", function() {
  gradient_h = this.value;
  gradient_canvas.setAttribute( "height", gradient_h );

  update();
}, false );

gradient_save.addEventListener( "click", function() {
  window.open( gradient_canvas.toDataURL( "image/png" ) );
}, false );
/* ===== GRADIENT ===== */


// check if visible 
function isVisible( ele ) {
  return ele.clientWidth !== 0 &&
    ele.clientHeight !== 0 &&
    ele.style.opacity !== 0 &&
    ele.style.visibility !== 'hidden';
}

var linear_gradient_end_point = 1;
var radial_gradient_radius = 0;

function update( jscolor ) {

  if ( isVisible( document.querySelector( ".solid" ) ) ) {

    solid_canvas_ctx.beginPath();
    solid_canvas_ctx.rect( 0, 0, solid_w, solid_h );
    solid_canvas_ctx.fillStyle = '#' + solid_color_picker.value
    solid_canvas_ctx.fill();

  } else {

    // Check if it is linear or radial
    if ( document.getElementById( "linear" ).checked === true ) {

      document.querySelector( ".radial_gradient_range_wrapper" ).style.display = "none";
      document.querySelector( ".linear_gradient_position_wrapper" ).style.display = "block";
      document.querySelector( ".linear_gradient_range_wrapper" ).style.display = "block";

      document.getElementById( "linear_gradient_range" ).addEventListener( "input", function() {
        linear_gradient_end_point = this.value
        update_linear_gradient();
      } );

      var update_linear_gradient = function() {
        var grd;

        // Check linear gradient position
        if ( document.getElementById( "linear_gradient_left" ).checked === true ) {
          grd = gradient_canvas_ctx.createLinearGradient( 0, 0, gradient_w * linear_gradient_end_point, 0 );
        } else if ( document.getElementById( "linear_gradient_top" ).checked === true ) {
          grd = gradient_canvas_ctx.createLinearGradient( 0, 0, 0, gradient_w * linear_gradient_end_point );
        } else if ( document.getElementById( "linear_gradient_right" ).checked === true ) {
          grd = gradient_canvas_ctx.createLinearGradient( gradient_w * linear_gradient_end_point, 0, 0, 0 );
        } else if ( document.getElementById( "linear_gradient_bottom" ).checked === true ) {
          grd = gradient_canvas_ctx.createLinearGradient( 0, gradient_w * linear_gradient_end_point, 0, 0 );
        }

        grd.addColorStop( 0, "#" + color_picker1.value );
        grd.addColorStop( 1, "#" + color_picker2.value );

        gradient_canvas_ctx.fillStyle = grd;
        gradient_canvas_ctx.fillRect( 0, 0, gradient_w, gradient_h );
      }
      update_linear_gradient();

    } else {

      document.querySelector( ".linear_gradient_range_wrapper" ).style.display = "none";
      document.querySelector( ".linear_gradient_position_wrapper" ).style.display = "none";
      document.querySelector( ".radial_gradient_range_wrapper" ).style.display = "block";

      document.getElementById( "radial_gradient_range" ).addEventListener( "input", function() {
        radial_gradient_radius = this.value
        update_radial_gradient();
      } );

      var update_radial_gradient = function() {

        var radial_grd = gradient_canvas_ctx.createRadialGradient( gradient_w * .5, gradient_h * .5, gradient_w * radial_gradient_radius, gradient_w * .5, gradient_h * .5, gradient_w * .5 );

        radial_grd.addColorStop( 0, "#" + color_picker1.value );
        radial_grd.addColorStop( 1, "#" + color_picker2.value );

        gradient_canvas_ctx.fillStyle = radial_grd;
        gradient_canvas_ctx.fillRect( 0, 0, gradient_w, gradient_h );

      }
      update_radial_gradient();

    }

  }

}
update();


// Update canvas background on input radio change
var linear_or_radial = document.querySelectorAll( "input" );
for ( var i = 0; i < linear_or_radial.length; i++ ) {

  if ( linear_or_radial[ i ].type == "radio" ) {
    linear_or_radial[ i ].addEventListener( "change", function() {
      update();
    } );
  }

}

// Solid or gradient tabs 
document.getElementById( "solid_tab" ).classList.add( "active" );

var gradient = document.querySelectorAll( ".gradient" );
var solid = document.querySelectorAll( ".solid" );

// Hide gradient tab by default
gradient[ 0 ].style.display = "none";

var tab = document.querySelectorAll( ".tab" );

for ( var i = 0; i < tab.length; i++ ) {

  tab[ i ].addEventListener( "click", function() {
    document.querySelector( '.active' ).classList.remove( 'active' );
    this.classList.toggle( "active" );

    // Check which tab is active
    if ( document.getElementById( "solid_tab" ).classList.contains( "active" ) ) {
      solid[ 0 ].style.display = "block";
      gradient[ 0 ].style.display = "none";

    } else {
      solid[ 0 ].style.display = "none";
      gradient[ 0 ].style.display = "block";
      update();
    }
  }, false );

}

// Check for custom width
var custom_width = document.querySelector( ".custom_width" );

custom_width.addEventListener( "click", function() {
  document.getElementById( "tick" ).classList.toggle( "checked" );

  if ( document.getElementById( "tick" ).classList.contains( "checked" ) ) {
    document.getElementById( "gradient_width" ).style.opacity = 1;
    document.getElementById( "gradient_height" ).style.opacity = 1;

    document.getElementById( "gradient_width" ).disabled = false;
    document.getElementById( "gradient_height" ).disabled = false;

  } else {
    document.getElementById( "gradient_width" ).style.opacity = 0.5;
    document.getElementById( "gradient_height" ).style.opacity = 0.5;

    document.getElementById( "gradient_width" ).disabled = true;
    document.getElementById( "gradient_height" ).disabled = true;
  }
}, false );

if ( document.getElementById( "tick" ).classList.contains( "checked" ) ) {
  document.getElementById( "gradient_width" ).style.opacity = 1;
  document.getElementById( "gradient_height" ).style.opacity = 1;

  document.getElementById( "gradient_width" ).disabled = false;
  document.getElementById( "gradient_height" ).disabled = false;

} else {
  document.getElementById( "gradient_width" ).style.opacity = 0.5;
  document.getElementById( "gradient_height" ).style.opacity = 0.5;
  document.getElementById( "gradient_width" ).disabled = true;
  document.getElementById( "gradient_height" ).disabled = true;
}
