'use client'
import Card from '@/components/hyperUI/Card';
import Button from '@/components/generic/Button';
import { getStyledStatus, getStatusIcon } from '@/utils/researchStatusUtils';
import { Layers as LayersIcon, Plus as AddIcon, Repeat as RepeatIcon, Check as CheckIcon, AlertTriangle as AlertTriangleIcon, Calendar as CalendarIcon } from "react-feather";
import { useState, useEffect } from 'react';
import apiClient from '@/utils/generic/api';

const iconProps = {size: 20}

export default function CreatePage() {

	//Fetch ALL of the researches by the user ID.

    return (<>
		<div className='h-full w-full'>
			<div className='h-full w-full flex flex-col items-center'>
				<div className='flex flex-col justify-start p-4 h-full max-w-3xl w-full'> {/* keeps content centered */}
				<div className='flex justify-between align-center mb-4'>

					<div className='text-3xl flex flex-col justify-center'>Buttons</div>
				</div>
					<div className='mb-4'>
						A collection of button components.
					</div>
					
				</div>
			</div>
		</div>
	</>
  );
}