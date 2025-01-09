import React from 'react';

const HomePageClient: React.FC = () => {
    return (
        <>
            <section className='info py-10 px-8'>
                <div className='grid gap-5 max-w-5xl mx-auto'>
                    <div className='backdrop-blur bg-white/30 bg-opacity-50 rounded-lg shadow-lg p-8'>
                        <h2 className='text-4xl font-bold text-center text-blue-600 mb-4'>
                            Blockchain Based Voting System
                        </h2>
                        <p className='text-lg text-gray-700 leading-relaxed'>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Excepturi aspernatur ipsum perferendis
                            consequuntur iure non nihil assumenda, repudiandae
                            saepe! At accusamus excepturi sit? Repellat,
                            voluptates. Aut error saepe officiis voluptatibus
                            culpa vero ex quod nesciunt ipsum sequi, inventore
                            esse, deserunt, obcaecati eum voluptate velit
                            accusantium illum voluptas recusandae vitae quam?
                            <br />
                            <br />
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quibusdam cupiditate odio a culpa dolor earum
                            repellat eos fugiat in incidunt.
                        </p>
                    </div>
                </div>

                <p className='alarm text-center text-lg mt-8'>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Rerum ullam omnis soluta quas sint alias!
                </p>
            </section>

            <div className='flex justify-center mt-10'>
                <a
                    href='/voting'
                    className='btn hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg'
                >
                    Go to Voting Page
                </a>
            </div>
        </>
    );
};

export default HomePageClient;
