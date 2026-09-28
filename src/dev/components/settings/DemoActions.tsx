type Props = {
	itemsCount: number
	hasChanges: boolean
	onAddItem: () => void
	onRemoveItem: () => void
	onClearItems: () => void
	onResetAll: () => void
}

export const DemoActions = ({
	itemsCount,
	hasChanges,
	onAddItem,
	onRemoveItem,
	onClearItems,
	onResetAll,
}: Props) => (
	<div className='buttons'>
		<button
			type='button'
			style={{ backgroundColor: '#6bd26b' }}
			onClick={onAddItem}
		>
			Add item
		</button>

		<button
			onClick={onRemoveItem}
			type='button'
			style={{
				backgroundColor: itemsCount > 0 ? '#fba930' : '#cccccc',
				cursor: itemsCount > 0 ? 'pointer' : 'not-allowed',
			}}
		>
			Remove item
		</button>

		<button
			onClick={onClearItems}
			type='button'
			style={{
				backgroundColor: itemsCount > 0 ? '#fb7030' : '#cccccc',
				cursor: itemsCount > 0 ? 'pointer' : 'not-allowed',
			}}
		>
			Clear items
		</button>

		<button
			onClick={onResetAll}
			type='button'
			disabled={!hasChanges}
			style={{
				marginLeft: 'auto',
				backgroundColor: hasChanges ? '#e95656' : '#cccccc',
				cursor: hasChanges ? 'pointer' : 'not-allowed',
			}}
		>
			Reset all settings
		</button>
	</div>
)
