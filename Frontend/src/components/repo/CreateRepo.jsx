import React from 'react'

const CreateRepo = () => {
  return (
    <div className="flex flex-col justify-between h-screen bg-[#090040] items-center text-white overflow-auto ">
        <div className="bg-[#471396] mt-20 p-6 w-[50%]  rounded-2xl flex items-center flex-col">
            <form >
                  <div class="space-y-12">
                    <div class="border-b border-white/10 pb-12">
                        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div class="sm:col-span-4">
                        <label for="username" class="block text-sm/6 font-medium text-white">Username</label>
                        <div class="mt-2">
                            <div class="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                            <div class="shrink-0 text-base text-gray-400 select-none sm:text-sm/6">workcation.com/</div>
                            <input id="username" type="text" name="username" placeholder="janesmith" class="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6" />
                            </div>
                        </div>
                        </div>

                        <div class="col-span-full">
                        <label for="about" class="block text-sm/6 font-medium text-white">About</label>
                        <div class="mt-2">
                            <textarea id="about" name="about" rows="3" class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"></textarea>
                        </div>
                        <p class="mt-3 text-sm/6 text-gray-400">Write a few sentences about yourself.</p>
                        </div>

                        <div class="col-span-full">
                        <label for="photo" class="block text-sm/6 font-medium text-white">Photo</label>
                        <div class="mt-2 flex items-center gap-x-3">
                            <svg viewBox="0 0 24 24" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-12 text-gray-500">
                            <path d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clip-rule="evenodd" fill-rule="evenodd" />
                            </svg>
                            <button type="button" class="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white inset-ring inset-ring-white/5 hover:bg-white/20">Change</button>
                        </div>
                        </div>

                        <div class="col-span-full">
                        <label for="cover-photo" class="block text-sm/6 font-medium text-white">Cover photo</label>
                        <div class="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
                            <div class="text-center">
                            <svg viewBox="0 0 24 24" fill="currentColor" data-slot="icon" aria-hidden="true" class="mx-auto size-12 text-gray-600">
                                <path d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clip-rule="evenodd" fill-rule="evenodd" />
                            </svg>
                            <div class="mt-4 flex text-sm/6 text-gray-400">
                                <label for="file-upload" class="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-400 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-500 hover:text-indigo-300">
                                <span>Upload a file</span>
                                <input id="file-upload" type="file" name="file-upload" class="sr-only" />
                                </label>
                                <p class="pl-1">or drag and drop</p>
                            </div>
                            <p class="text-xs/5 text-gray-400">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                        </div>
                        </div>
                        <div class="mt-6 flex items-center justify-center gap-x-6">
                            <button type="button" class="text-sm/6 font-semibold text-white">Cancel</button>
                            <button type="submit" class="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Save</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default CreateRepo
