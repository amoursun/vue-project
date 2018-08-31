import Recommend from './recommend.vue';
import Disc from 'common/components/disc/disc'
export default {
    path: 'recommend',
    component: Recommend,
    child: [
        {
            path: ':id',
            component: Disc
        }
    ]
};
