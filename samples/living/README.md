# Living Layer - FSI Layers Video Example

You can either add images or any html elements to _FSI Layers_. This demo shows how a simple video can be embedded.

Add FSI Layers to your site:

```html
<fsi-layers class="position-absolute" debug="1" useDevicePixelRatio="true"></fsi-layers>
```

# Adding groups and layers

We will add two layers, one containing the video and one group containing the overlay image and the rest.

```html
<fsi-layer name="video" contentInBackground="true" width="100%" height="100%" left="0" top="0"> </fsi-layer>

<fsi-layer-group
  bottom="centered"
  clip="false"
  height="100%"
  name="container"
  refHeight="2160"
  refMode="fit"
  refWidth="3840"
  right="centered"
  width="100%"
>
</fsi-layer-group>
```

## Adding the video

The video is simply added by using the `video` tag:

```html
<fsi-layer name="video" contentInBackground="true" width="100%" height="100%" left="0" top="0">
  <video
    width="100%"
    height="100%"
    autoplay
    loop
    muted
    playsinline
    poster="{{&fsi.server}}/{{&fsi.context}}/static/{{&sources.statics}}/living/forest-4k.mp4/poster.jpg"
  >
    <source
      src="{{&fsi.server}}/{{&fsi.context}}/static/{{&sources.statics}}/living/forest-4k.mp4/av1.1.mp4"
      type='video/mp4; codecs="av01.0.05M.08.0.110.01.01.01.1"'
    />
    <source
      src="{{&fsi.server}}/{{&fsi.context}}/static/{{&sources.statics}}/living/forest-4k.mp4/h265.1.mp4"
      type='video/mp4; codecs="hvc1"'
    />
    <source
      src="{{&fsi.server}}/{{&fsi.context}}/static/{{&sources.statics}}/living/forest-4k.mp4/h264.1.mp4"
      type='video/mp4; codecs="avc1.42E01E"'
    />
  </video>
</fsi-layer>
```

We also added some overlay content to the other group:

```html
  <fsi-layer name="card" left="2620 rpx" top="600 rpx" width="1760 rpx" height="432 rpx">
        <div class="card w-50 h-20 shadow d-none d-xxl-block">
          <h4 class="card-header">Featured</h4>
          <div class="card-body">
            <h5 class="card-title">Hiking equipment</h5>
            Including
            <ul>
              <li>Walking backpack</li>
              <li>Hiking pants and shirt</li>
              <li>Approach shoes</li>
              <li>Straw hat</li>
              <li>Rain cover</li>
              <li>Walking socks</li>
            </ul>
          </div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item text-center"><a class="btn btn-primary" href="#">Buy now</a></li>
          </ul>
        </div>
      </fsi-layer>
      <fsi-layer
        left="1420 rpx"
        name="tourist"
        src="{{&sources.images}}/video/tourist-superdark.png"
        top="200 rpx"
        width="1000 rpx"
      ></fsi-layer>
```

### Testing with images from your own server

To test the examples with images from your own [FSI Server](https://www.neptunelabs.com/fsi-server/), please first copy the env.yml.dist file to env.yml and adapt the file, then restart the main demo again.
