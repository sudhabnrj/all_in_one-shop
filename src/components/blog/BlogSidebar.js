import React from 'react'

const BlogSidebar = () => {
    return (
        <div className="block rounded border bg-neutral-50 p-2 lg:p-3">
            <div className="mb-4 leading-tight blog-cat-accordian">
                <button className="flex w-full cursor-pointer items-center justify-between border-b px-2 py-3 capitalize" type="button">
                    <span className="font-medium">Post by Topic</span>
                </button>
                <ul>
                    <li><a className="flex items-center gap-2 border-b p-2 hover:bg-lightodark-100" href="/blog"><span className="text-secondary">[12]</span>All</a></li>
                    <li><a className="flex items-center gap-2 border-b p-2 hover:bg-lightodark-100" href="/blog?category=39ed4ed8d45847bb8093664d31232b1d"><span className="text-secondary">[3]</span>ELANTAS Series</a></li>
                    <li><a className="flex items-center gap-2 border-b p-2 hover:bg-lightodark-100" href="/blog?category=2e29f71c391340a7b1d0f016bebf1c2b"><span className="text-secondary">[2]</span>Nomex Series</a></li>
                    <li><a className="flex items-center gap-2 border-b p-2 hover:bg-lightodark-100" href="/blog?category=94e40f97609e4e548d7459d87a871624"><span className="text-secondary">[4]</span>Silicones Series</a></li>
                    <li><a className="flex items-center gap-2 border-b p-2 hover:bg-lightodark-100" href="/blog?category=b490be7487df4e2fb4ba9eee3ed5dedc"><span className="text-secondary">[1]</span>News &amp; Events</a></li>
                    <li><a className="flex items-center gap-2 border-b p-2 hover:bg-lightodark-100" href="/blog?category=a1f70ed1150445239200522ffa776a20"><span className="text-secondary">[1]</span>Essex Brownell Cares</a></li>
                </ul>
            </div>
        </div>
    )
}

export default BlogSidebar
