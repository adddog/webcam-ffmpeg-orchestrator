import * as Color from './color-glsl'
const Multi = regl => {
  return regl({
    vert: `
  precision lowp float;
  attribute vec2 position;
  varying vec2 vUv;
  void main () {
    vUv = position;
    vec2 adjusted = 1.0 - 2.0 * position;
    gl_Position = vec4(adjusted, 0, 1);
  }`,

    frag: `

    #define NOISE_S 6.

  precision lowp float;
  uniform sampler2D texture;
  uniform sampler2D keyVideo;
  uniform sampler2D keyColors;
  uniform float tolerance;
  uniform float slope;
  //uniform float time;

  ${Color.uniform}

  varying vec2 vUv;

        ${Color.glsl}

  float chromaKeyAlphaTwoFloat(vec3 color, vec3 keyColor, float tolerance, float slope)
      {
        float d = abs(length(abs(keyColor - color)));
        float edge0 = tolerance * (1.0 - slope);
        float alpha = smoothstep(edge0, tolerance, d);
        return 1. - alpha;
      }

  void main () {
    vec2 uv = vUv;
    vec3 color = texture2D(texture, vec2(1.-uv.x, uv.y)).rgb;

    color = changeSaturation(color, uSaturation);

    float ff = max(

      max(
         chromaKeyAlphaTwoFloat(color,texture2D(keyColors, vec2(0., 0.5)).rgb, slope, tolerance),
         chromaKeyAlphaTwoFloat(color,texture2D(keyColors, vec2(0.23, 0.5)).rgb,slope, tolerance)
         ),

          max(
          chromaKeyAlphaTwoFloat(color,texture2D(keyColors, vec2(0.73, 0.5)).rgb,slope, tolerance),
          chromaKeyAlphaTwoFloat(color,texture2D(keyColors, vec2(1., 0.5)).rgb,slope, tolerance)
          )
        );


    gl_FragColor = vec4(mix(color, texture2D(keyVideo,uv).rgb, ff),1);
  }`,

    attributes: {
      position: [
        [-1, -1],
        [1, -1],
        [1, 1],
        [-1, -1],
        [1, 1],
        [-1, 1],
      ],
    },
    count: 6,
    uniforms: {
      texture: regl.prop("texture"),
      keyVideo: regl.prop("keyVideo"),
      keyColors: regl.prop("keyColors"),
      uSaturation: regl.prop("uSaturation"),
      slope: regl.prop("slope"),
      tolerance: regl.prop("tolerance"),
    },
  })
}

export default Multi
