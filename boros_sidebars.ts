import type {
	SidebarsConfig
} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
	borosSidebar: [
    {
			type: 'doc',
			id: 'Overview',
			label: "Introduction",
		},
		{
			type: 'doc',
			id: 'LitePaper',
			label: 'Lite Paper'
		},
		{
			type: 'doc',
			id: 'HighLevelArchitecture'
		},
		// { type: 'doc', id: 'FAQ', label: 'FAQ' },
		{
			type: 'category',
			label: 'Mechanics',
			items: [{
					type: 'doc',
					id: 'Mechanics/OrderBook',
					label: 'Order Book'
				},
				'Mechanics/Settlement',
				'Mechanics/Fees',
				'Mechanics/Margin'
			]
		},
		{
			type: 'category',
			label: 'Backend',
			items: [{
					type: 'doc',
					id: 'Backend/REST API',
					label: 'REST API'
				},
				{
					type: 'doc',
					id: 'Backend/SDK',
					label: 'SDK'
				},
				{
					type: 'doc',
					id: 'Backend/WebSocket',
					label: 'WebSocket'
				}
			]
		},
		{
			type: 'category',
			label: 'Contracts',
			items: [{
					type: 'doc',
					id: 'Contracts/Router',
					label: 'Router'
				},
				{
					type: 'doc',
					id: 'Contracts/MarketHub',
					label: 'Market Hub'
				},
				{
					type: 'doc',
					id: 'Contracts/Market',
					label: 'Market'
				},
				{
					type: 'doc',
					id: 'Contracts/CustomTypes'
				}
			]
		},
		{
			type: 'link',
			label: 'Whitepapers',
			href: 'https://github.com/pendle-finance/boros-core-public/tree/main/whitepapers'
		},
		{
			type: 'link',
			label: 'Boros Academy',
			href: 'https://pendle.gitbook.io/boros'
		}
	]
};

export default sidebars;
