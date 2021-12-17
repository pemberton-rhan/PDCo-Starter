<?php

/* Enqueue Styles and Scripts
-------------------------------------------------------------- */
function site_scripts_styles() {

  // Styles
  wp_enqueue_style( 'main-stylesheet', get_stylesheet_uri() );

  // Scripts
  wp_enqueue_script( 'jquery' );
  wp_enqueue_script( 'main', get_stylesheet_directory_uri() . '/main.js', null, ['jquery'], true );
}
add_action( 'wp_enqueue_scripts', 'site_scripts_styles' );

/* Register Nav-Menus
-------------------------------------------------------------- */
register_nav_menus( [
  'main_menu' => 'Main Menu',
] );

/* No Tab Conflicts Gravity Forms
-------------------------------------------------------------- */
add_filter( 'gform_tabindex', 'gform_tabindexer', 10, 2 );

function gform_tabindexer( $tab_index, $form = false ) {
  $starting_index = 1000; // if you need a higher tabindex, update this number

  if ( $form ) {
    add_filter( 'gform_tabindex_' . $form['id'], 'gform_tabindexer' );
  }

  return GFCommon::$tab_index >= $starting_index ? GFCommon::$tab_index : $starting_index;
}

/* Dynamic Sidebars
-------------------------------------------------------------- */
if ( function_exists( 'register_sidebars' ) ) {
  register_sidebar( [
  'name'          => 'Sidebar',
  'id'            => 'sidebar',
  'description'   => '',
  'before_widget' => '<div id="%1$s" class="widget %2$s">',
  'after_widget'  => '</div>',
  'before_title'  => '<h3 class="widgettitle">',
  'after_title'   => '</h3>',
  ] );

  register_sidebar( [
  'name'          => 'Blog Sidebar',
  'id'            => 'blog_sidebar',
  'description'   => '',
  'before_widget' => '<div id="%1$s" class="widget %2$s">',
  'after_widget'  => '</div>',
  'before_title'  => '<h3 class="widgettitle">',
  'after_title'   => '</h3>',
  ] );
}

/* Add Theme Support Page Thumbnails
-------------------------------------------------------------- */
add_theme_support( 'post-thumbnails' );

/* Add ACF Options Page
-------------------------------------------------------------- */
if ( function_exists( 'acf_add_options_page' ) ) {
  acf_add_options_page( [
  'page_title' => 'Site Options',
  'menu_title' => 'Site Options',
  'menu_slug'  => 'site-options',
  'capability' => 'edit_posts',
  'redirect'   => false,
  ] );
}

/* Is Tree
-------------------------------------------------------------- */

// This function will return true if we are looking at the page in question or one of its sub pages
function is_tree( $pid ) {
  global $post;

  if ( is_page( $pid ) ) {
    return true;
  }

  $anc = get_post_ancestors( $post->ID );

  foreach ( $anc as $ancestor ) {
    if ( is_page() && $ancestor == $pid ) {
      return true;
    }
  }

  return false;
}

/* Remove BLOCK patterns option
-------------------------------------------------------------- */

remove_theme_support( 'core-block-patterns' );

/* Custom BLOCK categories
-------------------------------------------------------------- */

function pdco_block_categories( $categories ) {
  $category_slugs = wp_list_pluck( $categories, 'slug' );
  return in_array( 'pdco', $category_slugs, true ) ? $categories : array_merge(
    $categories,
    array(
      array(
        'slug'  => 'pdco-header-blocks',
        'title' => __( 'Header Blocks' ),
        'icon'  => null,
      ),
      array(
        'slug'  => 'pdco-content-blocks',
        'title' => __( 'Content Blocks' ),
        'icon'  => null,
      ),
    )
  );
}
add_filter( 'block_categories', 'pdco_block_categories' );

/* ACF Custom Styles
-------------------------------------------------------------- */

add_action( 'acf/input/admin_head', 'my_acf_admin_head' );
  function my_acf_admin_head() { ?>
  <style type="text/css">
    <?php include_once 'admin/acf-custom-styles/acf-custom-styles.css'; ?>
  </style>
<?php }

/* ACF Blocks
-------------------------------------------------------------- */

add_action( 'acf/init', 'my_acf_init_block_types' );
function my_acf_init_block_types() {

  // Check function exists.
  if ( function_exists( 'acf_register_block_type' ) ) {
    include_once 'blocks/hero-blocks/block-reg.php';
    include_once 'blocks/content-blocks/block-reg.php';
    include_once 'blocks/widget-blocks/block-reg.php';
  }
}
