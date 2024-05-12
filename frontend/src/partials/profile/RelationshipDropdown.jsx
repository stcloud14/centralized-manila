import React from 'react';

    const RelationshipDropdown = () => {
        return (
            <>
                     <option value="0" className="dark:bg-[#3d3d3d]">Select Relationship</option>
                    <option value="SIBLINGS" label="Sibling" className='dark:bg-[#3d3d3d]'>Sibling</option>
                    <option value="FATHER" label="Father" className='dark:bg-[#3d3d3d]'>Father</option>
                    <option value="DAUGHTER" label="Daughter" className='dark:bg-[#3d3d3d]'>Daughter</option>
                    <option value="SON" label="Son" className='dark:bg-[#3d3d3d]'>Son</option>
                    <option value="GRAND MOTHER" label="Grand Mother" className='dark:bg-[#3d3d3d]'>Grand Mother</option>
                    <option value="GRAND FATHER" label="Grand Father" className='dark:bg-[#3d3d3d]'>Grand Father</option>
                    <option value="AUNT" label="Aunt" className='dark:bg-[#3d3d3d]'>Aunt</option>
                    <option value="UNCLE" label="Uncle" className='dark:bg-[#3d3d3d]'>Uncle</option>
                    <option value="COUSIN" label="Cousin" className='dark:bg-[#3d3d3d]'>Cousin</option>
                    <option value="NIECE" label="Niece" className='dark:bg-[#3d3d3d]'>Niece</option>
                    <option value="NEPHEW" label="Nephew" className='dark:bg-[#3d3d3d]'>Nephew</option>
                    <option value="GRAND DAUGHTER" label="Grand Daughter" className='dark:bg-[#3d3d3d]'>Grand Daughter</option>
                    <option value="GRAND SON" label="Grand Son" className='dark:bg-[#3d3d3d]'>Grand Son</option>
                    <option value="IN-LAW" label="In-Law" className='dark:bg-[#3d3d3d]'>In-Law</option>
                    <option value="STEP-PARENT" label="Step-Parent" className='dark:bg-[#3d3d3d]'>Step-Parent</option>
                    <option value="STEP-SIBLING" label="Step-Sibling" className='dark:bg-[#3d3d3d]'>Step-Sibling</option>
                    <option value="GUARDIAN" label="Guardian" className='dark:bg-[#3d3d3d]'>Guardian</option>
                    <option value="FOSTER PARENT" label="Foster Parent" className='dark:bg-[#3d3d3d]'>Foster Parent</option>
                    <option value="GOD PARENT" label="God Parent" className='dark:bg-[#3d3d3d]'>God Parent</option>
                    <option value="LEGAL GUARDIAN" label="Legal Guardian" className='dark:bg-[#3d3d3d]'>Legal Guardian</option>
            </>

            );
        };

export default RelationshipDropdown;
