<!-- This bit of code shows a preview of the block when choosing blocks from the Wordpress dashboard -->
<?php if( isset( $block['data']['preview_image'] ) ): ?>
  <?php echo '<img src="'. $block['data']['preview_image'] .'" style="width:100%; height:auto;">'; ?>
<?php endif; ?>
<!-- End -->
  
<section class="hero hero-v1 max-width max-width--padding">
  
  <?php if( get_field('background_video') ): ?>
    <div class="hero-v1__background-video-wrapper">
      <div class="hero-v1__video-overlay"></div>
      <video id="hero-v1__video" autoplay muted loop>
        <source src="<?php the_field('background_video'); ?>" type="video/mp4">
      </video>
    </div>
  <?php endif; ?>
  
  <div class="hero-v1__inner inner-wrap">
    <div class="hero-v1__content-wrap">
      <p class="hero-v1__tagline"><?php the_field('tagline'); ?></p>
      <h1 class="hero-v1__title"><?php the_field('title'); ?></h1>
    </div>
  </div>
</section>

<div class="spacing"></div>