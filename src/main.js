import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import PrimeVue from 'primevue/config';
import { createPinia } from 'pinia';
import '@/assets/styles.scss';
import ToastService from 'primevue/toastservice';

import { Form, Field, ErrorMessage  } from 'vee-validate';
import Button from 'primevue/button'
import Toolbar from 'primevue/toolbar'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InputMask from 'primevue/inputmask'
import Card from 'primevue/card'
import Toast from 'primevue/toast'
import Dropdown from 'primevue/dropdown'
import PickList from 'primevue/picklist'
import Checkbox from 'primevue/checkbox'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Menubar from 'primevue/menubar'
import ScrollPanel from 'primevue/scrollpanel'
import Badge from 'primevue/badge'
import Textarea from 'primevue/textarea'
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Tooltip from 'primevue/tooltip';
import ProgressBar from 'primevue/progressbar';
import Avatar from 'primevue/avatar';
import ProgressSpinner from 'primevue/progressspinner';
import InputSwitch from 'primevue/inputswitch';



const app = createApp(App)
const pinia = createPinia()

app.use(router);
app.use(PrimeVue, { ripple: true });
app.use(pinia)
app.use(ToastService);

app.directive('tooltip', Tooltip);

app.component('VeeForm',Form)
app.component('VeeField',Field)
app.component('VeeErrorMessage',ErrorMessage)
app.component('Button',Button)
app.component('Toolbar',Toolbar)
app.component('DataTable',DataTable)
app.component('Column',Column)
app.component('Dialog',Dialog)
app.component('InputText',InputText)
app.component('InputMask',InputMask)
app.component('Card',Card)
app.component('Toast',Toast)
app.component('Dropdown',Dropdown)
app.component('PickList',PickList)
app.component('Checkbox',Checkbox)
app.component('TabView',TabView)
app.component('TabPanel',TabPanel)
app.component('Menubar',Menubar)
app.component('ScrollPanel',ScrollPanel)
app.component('Badge',Badge)
app.component('Textarea',Textarea)
app.component('Accordion',Accordion)
app.component('AccordionTab',AccordionTab)
app.component('ProgressBar',ProgressBar)
app.component('Avatar',Avatar)
app.component('ProgressSpinner',ProgressSpinner)
app.component('InputSwitch',InputSwitch)

app.mount('#app');
