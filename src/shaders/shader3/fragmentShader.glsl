
varying vec2 vUv;
uniform vec2 uSize;
uniform float uTime;

// // Flame methods
// float noise(vec3 p) //Thx to Las^Mercury
// {
// 	vec3 i = floor(p);
// 	vec4 a = dot(i, vec3(1., 57., 21.)) + vec4(0., 57., 21., 78.);
// 	vec3 f = cos((p-i)*acos(-1.))*(-.5)+.5;
// 	a = mix(sin(cos(a)*a),sin(cos(1.+a)*(1.+a)), f.x);
// 	a.xy = mix(a.xz, a.yw, f.y);
// 	return mix(a.x, a.y, f.z);
// }

// float sphere(vec3 p, vec4 spr)
// {
// 	return length(spr.xyz-p) - spr.w;
// }

// float flame(vec3 p)
// {
// 	float d = sphere(p*vec3(1.,.5,1.), vec4(.0,-1.,.0,1.));
// 	return d + (noise(p+vec3(.0,uTime*2.,.0)) + noise(p*3.)*.5)*.25*(p.y) ;
// }

// float scene(vec3 p)
// {
// 	return min(100.-length(p) , abs(flame(p)) );
// }

// vec4 raymarch(vec3 org, vec3 dir)
// {
// 	float d = 0.0, glow = 0.0, eps = 0.02;
// 	vec3  p = org;
// 	bool glowed = false;
	
// 	for(int i=0; i<64; i++)
// 	{
// 		d = scene(p) + eps;
// 		p += d * dir;
// 		if( d>eps )
// 		{
// 			if(flame(p) < .0)
// 				glowed=true;
// 			if(glowed)
//        			glow = float(i)/64.;
// 		}
// 	}
// 	return vec4(p,glow);
// }


void main() {

    vec2 uv = vUv;

    // uv.y *= uSize.x / uSize.y;

    // float pattern = distance(uv, vec2(.5));

    // float r = .3;
    // float b = .01;

    // pattern = smoothstep(r, r - b, pattern);
    // gl_FragColor = vec4(vec3(pattern), 1.);

    // Fire simulating
    // uv.y *= uSize.x / uSize.y;
    // vec3 color = vec3(0.0);
  
    // // Create a time-varying noise function to animate the fire
    // float noise = 0.0;
    // float scale = 1.0;
    // for (int i = 0; i < 3; i++) {
    //     noise += abs(sin(uTime * 0.1 * scale + uv.y * 2.0)) * .2;
    //     scale *= 2.0;
    // }
    
    // // Simulate the fire by generating a gradient from black to red to yellow
    // color = mix(vec3(0.0), vec3(1.0, 0.2, 0.0), uv.y + noise);
    // color = mix(color, vec3(.2, 0., .7), uv.y + noise * 0.5);
    
    // // Add some flicker to the fire
    // color += vec3(sin(uTime * 20. + uv.x * 10.0)) * 0.1;
    
    // gl_FragColor = vec4(color, 1.0);


    // Portal simulating
    // Create a time-varying noise function to animate the portal
    // Animation
    float noise = abs(sin(uTime * 1.3 + uv.y * 10.0));


    // Static
    // float noise = abs(sin(uv.y * 10.0));
    
    // Calculate the distance from the center of the portal
    vec2 center = vec2(0.5, 0.5);
    float distance = length(uv - center);
    
    // Calculate the radius of the portal
    float radius = 0.2 + noise * 0.1;
    
    // Calculate the alpha value based on the distance from the center and the radius of the portal
    float alpha = smoothstep(radius - 0.01, radius + 0.01, distance);
    
    // Create a gradient from black to white for the background
    vec3 color = mix(vec3(0., 0., 0.), vec3(1.0), distance);
    
    // Create a gradient from white to transparent for the portal
    vec4 portal = vec4(.8);
    portal.a = smoothstep(radius - 0.01, radius + 0.01, distance);
    
    // Add some light to the edge of the portal

    // Colorful
    portal.rgb += vec3(0.8, 0.8, 0.2) * pow((radius - distance) * 10.0, 3.0) * alpha;
    
    // Black and white
    // portal.rgb += vec3(0., 0., 0.) * pow((radius - distance) * 5., 2.0) * alpha;
    
    // Combine the background and the portal
    gl_FragColor = mix(vec4(color, 0.), portal, portal.a);


    // // Flame
    // // Created by anatole duprat - XT95/2013
    // // License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.

	// // vec2 v = -1.0 + 2.0 * uv.xy / uSize.xy;
    // vec2 v = uv;
	// v.x *= uSize.x/uSize.y;
	
	// vec3 org = vec3(0., -2., 4.);
	// vec3 dir = normalize(vec3(v.x*1.6, -v.y, -1.5));
	
	// vec4 p = raymarch(org, dir);
	// float glow = p.w;
	
	// vec4 col = mix(vec4(1.,.5,.1,1.), vec4(0.1,.5,1.,1.), p.y*.02+.4);
	
	// gl_FragColor = mix(vec4(0.), col, pow(glow*2.,4.));
	// //gl_FragColor = mix(vec4(1.), mix(vec4(1.,.5,.1,1.),vec4(0.1,.5,1.,1.),p.y*.02+.4), pow(glow*2.,4.));


}