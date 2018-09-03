import Rank from './rank.vue';
import TopList from 'common/components/top-list/top-list.vue'
export default {
    path: 'rank',
    component: Rank,
    child: [
        {
            path: ':id',
            component: TopList
        }
    ]
};
