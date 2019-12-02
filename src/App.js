import React, { useEffect, useState } from 'react';
import './App.css';
import Winwheel from './Winwheel';

function App() {

	const [modal, setModal] = useState({
		active: false,
		text: ''
	})

	function startSpin(){
		window.winwheel.animation.spins = 3;
		window.winwheel.startAnimation();
		window.wheelSpinning = true;
	}

	function resetWheel(){
    window.winwheel.stopAnimation(false);  // Stop the animation, false as param so does not call callback function.
    window.winwheel.rotationAngle = 0;     // Re-set the wheel angle to 0 degrees.
    window.winwheel.draw();
    window.wheelSpinning = false;          // Reset to false to power buttons and spin can be clicked again.
	}
		
	useEffect(() => {
		window.winwheel = new Winwheel({
			'numSegments'  : 8,     // Specify number of segments.
      'outerRadius'  : 212,   // Set outer radius so wheel fits inside the background.
      'textFontSize' : 28,    // Set font size as desired.
      'segments'     :        // Define segments including colour and text.
        [
					{'fillStyle' : '#eae56f', 'text' : '10 reais'},
					{'fillStyle' : '#89f26e', 'text' : '20 reais'},
					{'fillStyle' : '#7de6ef', 'text' : '30 reais'},
					{'fillStyle' : '#e7706f', 'text' : '40 reais'},
					{'fillStyle' : '#eae56f', 'text' : '50 reais'},
					{'fillStyle' : '#89f26e', 'text' : '60 reais'},
					{'fillStyle' : '#7de6ef', 'text' : '70 reais'},
					{'fillStyle' : '#e7706f', 'text' : '80 reais'}
    		],
        'animation' :   // Specify the animation to use.
				{
					// 'callbackFinished' : (indicatedSegment) => alert('Você ganhou o tóba do ' + indicatedSegment.text),
					'callbackFinished' : indicatedSegment => setModal({active: true, text: indicatedSegment.text}),
					'type'     : 'spinToStop',
					'duration' : 5,
					'spins'    : 8,
				}
		})

		window.wheelSpinning = false;
		window.wheelPower    = 0;
	}, [])

  return (
    <div className='app-header'>
			{modal.active && (
				<div className='mascara-modal'>
					<div className='modal'>
						Parabéns você acabou de ganhar R${modal.text} em compras
					</div>
				</div>
			)}
			<span className='arrow-down'></span>
      <canvas id='canvas' width='450' height='450'>
      	 Canvas not supported, use another browser.
      </canvas>
			<div className='button-wrapper'>
				<button id="spin_button" alt="Spin" onClick={() => startSpin()}> 
					Play
				</button>
				<button id="spin_button" alt="Spin" onClick={() => resetWheel()}> 
					Reset
				</button>
			</div>
    </div>
  );
}

export default App;
