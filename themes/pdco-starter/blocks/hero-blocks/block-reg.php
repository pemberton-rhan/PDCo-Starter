<?php
 acf_register_block_type( [
   'name'              => 'hero-v1',
   'title'             => __( 'Hero - v1' ),
   'description'       => __( 'Hero - v1 Is a text heavy minimal hero block with options for a TAGLINE and up to two CTA buttons' ),
   'render_template'   => 'blocks/hero-blocks/hero-v1/block.php',
   'enqueue_style'     => get_template_directory_uri() . '/blocks/hero-blocks/hero-v1/block.css',
   'enqueue_script'    => get_template_directory_uri() . '/blocks/hero-blocks/hero-v1/block-min.js',
   'category'          => 'pdco-hero-blocks',
   'icon'              => 'cover-image',
   'keywords'          => [ 'hero', 'hero', 'v1' ],
   'mode'              => 'edit',
   'example'  => array(
      'attributes' => array(
       'mode' => 'preview',
       'data' => array(
         'preview_image' => get_template_directory_uri() . '/blocks/hero-blocks/hero-v1.png',
       )
      )
    )
] );