import React from 'react';
import { Link } from 'react-router-dom';
import { tailwindConfig, hexToRGB } from '../../utils/Utils';

function Card01() {

    return (
        <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-[#2b2b2b] dark:border-[#3d3d3d] shadow-lg rounded-sm border border-slate-200">
            <div className="px-5 py-5">

                    <div>
                        <h2 className="font-bold text-4xl">Latest News</h2>
                        <hr />
                    </div>
                    
                    <div className="flex justify-center items-center pt-5">
                        <img src="../src/images/user-36-01.jpg" className=''/>
                    </div>
                   
                    <span>I am Pogi</span>
                    <br />
    
                    <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, debitis dolorum eum pariatur soluta molestiae incidunt ipsam provident eaque ut ducimus alias quas cumque quisquam ratione laborum. Sapiente, laboriosam, maxime, exercitationem esse mollitia ipsa autem aliquid magni incidunt quia corporis. Beatae porro minus modi possimus illo officia obcaecati dignissimos aliquam suscipit omnis! Dignissimos perspiciatis maxime harum atque quibusdam dolores necessitatibus, natus fugit nulla est veniam ad laudantium illo incidunt quasi debitis quod consectetur numquam mollitia autem rem accusamus molestias deleniti?</span>






            </div>
        </div>
    )

}

export default Card01