import { computed, ref } from "vue";
import Page from "../models/Page";

type IdBearing = {id: number};

type Args<T> = {
    getPage: (num: number) => Promise<Page<T> | string>,
    remove: (id: number) => Promise<void | string>,
    create: (obj: T) => Promise<T | string>,
    update: (id: number, obj: T) => Promise<T | string>,
};

const useControls = <T extends IdBearing>( { getPage, remove, create, update}: Args<T>) => {
    const page = ref<Array<T>>([]);
    const totalPages = ref<number>(1);
    const isFormDisplayed = ref<boolean>(false);
    const isConfirmDialogDisplayed = ref<boolean>(false);
    const isPageLoading = ref<boolean>(false);
    const errorText = ref<string>('');

    const _idToDelete = ref<number>(-500);
    const _idToUpdate = ref<number>(-500);
    const _isFormForUpdate = ref<boolean>(false);

    const _onUpdate = async (obj: T) => {
        const result = await update(_idToUpdate.value, obj);

        if(typeof result != 'string') {
            const idx = page.value.findIndex(o => o.id === _idToUpdate.value);

            page.value.splice(idx, 1, result);
            
            isFormDisplayed.value = false;
            errorText.value = '';
        } else {
            errorText.value = result;
        }

        _idToUpdate.value = -500;
    }

    const _onAdd = async (obj: T) => {
        const result = await create(obj);

        if(typeof result != 'string') {
            page.value.push(result);

            isFormDisplayed.value = false;
            errorText.value = '';
        } else {
            errorText.value = result;
        }
    };

    const onAdd = async () => {
        _idToUpdate.value = -500;
        _isFormForUpdate.value = false;
        isFormDisplayed.value = true;
    }

    const onDelete = (id: number) => {
        _idToDelete.value = id;

        isConfirmDialogDisplayed.value = true;
    }

    const onUpdate = (id: number) => {
        _idToUpdate.value = id;
        _isFormForUpdate.value = true;
        isFormDisplayed.value = true;
    }

    const onFormSubmit = (obj: T) => {
        if(_isFormForUpdate.value) {
            return _onUpdate(obj);
        }
        return _onAdd(obj);
    }

    const onGetPage = async (requestedPage: number) => {
        isPageLoading.value = true;

        const pageResult = await getPage(requestedPage);

        if(typeof pageResult != 'string') {
            page.value = pageResult.data;
            totalPages.value = pageResult.totalPages;
        }

        isPageLoading.value = false;
    };

    const performDelete = async () => {
        isConfirmDialogDisplayed.value = false;

        const deleteRes = await remove(_idToDelete.value);
        if(!deleteRes) {
            page.value = page.value.filter( d => d.id != _idToDelete.value);
        } else {
            errorText.value = deleteRes;
        }

        _idToDelete.value = -500;
    }

    const updateCandidate = computed(() => {
        if(_idToUpdate.value === -500) {
            return undefined;
        }

        return page.value.find(o => o.id === _idToUpdate.value);
    });
    
    return {
        page,
        totalPages,
        isFormDisplayed,
        isConfirmDialogDisplayed,
        isPageLoading,
        errorText,
        updateCandidate,

        onDelete,
        onFormSubmit,
        onGetPage,
        onAdd,
        performDelete,
        onUpdate,
    };
};

export default useControls;