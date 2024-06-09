import { computed, ref } from "vue";
import Page from "../models/Page";

type Args<T> = {
    getPage: (num: number) => Promise<Page<T> | string>,
};

const withReadOnlyControls = <T>({ getPage }: Args<T>) => {
    const page = ref<Array<T>>([]);
    const error = ref<string>();
    const totalPages = ref<number>(1);
    const isPageLoading = ref<boolean>(false);

    const onGetPage = async (requestedPage: number) => {
        isPageLoading.value = true;

        const pageResult = await getPage(requestedPage);

        if(typeof pageResult != 'string') {
            page.value = pageResult.data;
            error.value = undefined;
            totalPages.value = pageResult.totalPages;
        } else {
            error.value = pageResult;
        }

        isPageLoading.value = false;
    };

    return {
        page,
        error,
        totalPages,
        isPageLoading,
        onGetPage
    };
};

export default withReadOnlyControls;