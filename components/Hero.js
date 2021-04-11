import React, { useState } from 'react';
import '../styles/Hero.module.css';
import Typewriter from 'typewriter-effect';

function Hero({ loading, text }) {
	return (
		<React.Fragment>
			<div className="jumbotron hero-homepage">
				<Typewriter
					options={{
						strings: text,
						autoStart: true,
						loop: true
					}}
				/>
			</div>
		</React.Fragment>
	);
}

export default Hero;
