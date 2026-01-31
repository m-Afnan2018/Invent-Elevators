
import styles from './subcategories.module.css'
import SubCategoryCreate from "@/components/core/admin/subcategories/SubCategoryCreate";
import SubCategoryFilters from "@/components/core/admin/subcategories/SubCategoryFilters";
import SubCategoryList from "@/components/core/admin/subcategories/SubCategoryList";
import SubCategoryStats from "@/components/core/admin/subcategories/SubCategoryStats";


export default function SubCategory() {
    return <section>
        <div className={styles.top}>
            <SubCategoryCreate />
            <SubCategoryStats />
        </div>

        <SubCategoryFilters />
        <SubCategoryList />

    </section>
}