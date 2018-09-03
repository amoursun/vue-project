import Search from './search.vue';
import SingerDetail from 'common/components/singer-detail/singer-detail.vue'
export default {
    path: 'search',
    component: Search,
    child: [
        {
            path: ':id',
            component: SingerDetail
        }
    ]
};
