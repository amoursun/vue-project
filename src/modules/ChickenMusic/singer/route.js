import Singer from './singer.vue';
import SingerDetail from 'common/components/singer-detail/singer-detail.vue'
export default {
    path: 'singer',
    component: Singer,
    child: [
        {
            path: ':id',
            component: SingerDetail
        }
    ]
};
