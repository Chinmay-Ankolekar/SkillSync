const LandingPage = () => {
  return (
    <>
        <header class="relative flex max-w-screen-xl flex-col overflow-hidden px-4 py-4 text-indigo-900 md:mx-auto md:flex-row md:items-center">
    <a href="#" class="flex cursor-pointer items-center whitespace-nowrap text-2xl font-black">
      <span class="mr-2 text-4xl text-indigo-500">
        <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M6.925 16.875Q5.2 16.225 4.1 14.713Q3 13.2 3 11.25q0-1.975.938-3.513Q4.875 6.2 6 5.15q1.125-1.05 2.062-1.6L9 3v2.475q0 .625.45 1.062q.45.438 1.075.438q.35 0 .65-.15q.3-.15.5-.425L12 6q.95.55 1.625 1.35t1.025 1.8l-1.675 1.675q-.05-.6-.287-1.175q-.238-.575-.638-1.05q-.35.2-.738.287q-.387.088-.787.088q-1.1 0-1.987-.612Q7.65 7.75 7.25 6.725q-.95.925-1.6 2.062Q5 9.925 5 11.25q0 .775.275 1.462q.275.688.75 1.213q.05-.5.287-.938q.238-.437.588-.787L9 10.1l2.15 2.1q.05.05.1.125t.1.125l-1.425 1.425q-.05-.075-.087-.125q-.038-.05-.088-.1L9 12.925l-.7.7q-.125.125-.212.287q-.088.163-.088.363q0 .3.175.537q.175.238.45.363ZM9 10.1Zm0 0ZM7.4 22L6 20.6L19.6 7L21 8.4L17.4 12H21v2h-5.6l-.5.5l1.5 1.5H21v2h-2.6l2.1 2.1l-1.4 1.4l-2.1-2.1V22h-2v-4.6l-1.5-1.5l-.5.5V22h-2v-3.6Z" /></svg>
      </span>
      streamio
    </a>
    <input type="checkbox" class="peer hidden" id="navbar-open" />
    <label class="absolute top-5 right-7 cursor-pointer md:hidden" for="navbar-open">
      <span class="sr-only">Toggle Navigation</span>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </label>
    <nav aria-label="Header Navigation" class="peer-checked:mt-8 peer-checked:max-h-56 flex max-h-0 w-full flex-col items-center justify-between overflow-hidden transition-all md:ml-24 md:max-h-full md:flex-row md:items-start">
      <ul class="flex flex-col items-center space-y-2 md:ml-auto md:flex-row md:space-y-0">
        <li class="font-bold md:mr-12"><a href="#">Pricing</a></li>
        <li class="md:mr-12"><a href="#">Features</a></li>
        <li class="md:mr-12"><a href="#">Support</a></li>
        <li class="md:mr-12">
          <button class="rounded-full border-2 border-indigo-600 px-6 py-1 text-indigo-600 transition-colors hover:bg-indigo-600 hover:text-white">Login</button>
        </li>
      </ul>
    </nav>
</header>

<div class="relative mx-auto flex flex-col px-4 sm:max-w-xl md:h-screen md:max-w-screen-xl md:flex-row">

  <div class="mx-auto mt-10 w-full max-w-xl md:mt-36 lg:max-w-screen-xl">
    <div class="mb-16 lg:mb-0 lg:max-w-lg">
      <div class="mb-6 max-w-xl">
        <div>
          <p class="bg-teal-accent-400 mb-4 inline-block rounded-full px-3 py-px text-xs font-semibold uppercase tracking-wider text-indigo-900">INTRODUCING</p>
        </div>
        <h2 class="mb-6 max-w-lg font-sans text-3xl font-bold tracking-tight text-slate-700 sm:text-5xl sm:leading-snug">
          An inspiring <br />
          new future for
          <span class="inline-block text-indigo-600">Web 3.0</span>
        </h2>
        <p class="text-base text-gray-700 md:text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas ullam rem voluptatem, animi tempora expedita!Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, consequuntur quaerat! Optio.</p>
      </div>
      <div class="flex items-center">
        <a href="/" class="mr-6 inline-flex h-12 items-center justify-center rounded bg-indigo-600 px-6 font-medium tracking-wide text-white shadow-md outline-none transition duration-200 hover:bg-indigo-400 focus:ring"> Get started </a>
        <a href="/" aria-label="" class="inline-flex items-center font-semibold text-indigo-600 transition-colors duration-200 hover:text-indigo-400">Learn more</a>
      </div>
    </div>
  </div>

  <div class="xl:1/2 flex h-full w-full justify-end space-x-3 overflow-hidden px-2 lg:w-2/3">

    <div class="flex flex-col space-y-3 md:w-72">
      <div class="-mt-5 hidden h-40 flex-shrink-0 rounded-xl bg-indigo-50 md:block"></div>
      <div class="relative rounded-xl bg-white p-4 shadow-md">
        <p class="text-sm text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis aliquam vero illo fuga libero nihil quisquam, aspernatur sint.</p>
        <div class="mt-4 flex items-center">
          <a href="#" class="relative block">
            <img alt="" src="/images/Bm8G0V9ytRbCalT-KOSMT.png" class="mx-auto h-10 w-10 rounded-full object-cover" />
          </a>
          <div class="ml-2 flex flex-col justify-between">
            <span class="text-sm font-semibold text-indigo-500"> Simon Lewis </span>
            <span class="flex items-center text-xs text-gray-500"> Head of marketing at Resnet </span>
          </div>
        </div>
      </div>
      <div class="relative rounded-xl bg-indigo-600 p-4 shadow-md">
        <div class="absolute -left-1 top-0 -z-10 h-5 w-5 skew-x-[28deg] bg-indigo-600"></div>
        <p class="text-sm text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam ratione atque officia.Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis aliquam vero illo fuga libero nihil quisquam, aspernatur sint.</p>
        <div class="mt-4 flex items-center">
          <a href="#" class="relative block">
            <img alt="" src="/images/y9s3xOJV6rnQPKIrdPYJy.png" class="mx-auto h-10 w-10 rounded-full object-cover" />
          </a>
          <div class="ml-2 flex flex-col justify-between">
            <span class="text-sm font-semibold text-white"> Simon Lewis </span>
            <span class="flex items-center text-xs text-white"> Head of marketing at Resnet </span>
          </div>
        </div>
      </div>
      <div class="relative rounded-xl bg-white p-4 shadow-md">
        <p class="text-sm text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis aliquam vero illo fuga libero nihil quisquam, aspernatur sint.</p>
        <div class="mt-4 flex items-center">
          <a href="#" class="relative block">
            <img alt="" src="/images/x4vs_ucCRWYTU_yLQ6h26.png" class="mx-auto h-10 w-10 rounded-full object-cover" />
          </a>
          <div class="ml-2 flex flex-col justify-between">
            <span class="text-sm font-semibold text-indigo-500"> Simon Lewis </span>
            <span class="flex items-center text-xs text-gray-500"> Head of marketing at Resnet </span>
          </div>
        </div>
      </div>
      <div class="-mt-10 hidden h-40 flex-shrink-0 rounded-xl bg-indigo-50 md:block"></div>
    </div>


    <div class="hidden w-72 flex-col space-y-3 lg:flex">
      <div class="-mt-10 hidden h-40 flex-shrink-0 rounded-xl bg-indigo-50 md:block"></div>
      <div class="relative rounded-xl bg-white p-4 shadow-md">
        <p class="text-sm text-gray-600">Elit. Facilis aliquam vero illo fuga libero nihil quisquam, aspernatur sint.</p>
        <div class="mt-4 flex items-center">
          <a href="#" class="relative block">
            <img alt="" src="/images/oPf2b7fqx5xa3mo68dYHo.png" class="mx-auto h-10 w-10 rounded-full object-cover" />
          </a>
          <div class="ml-2 flex flex-col justify-between">
            <span class="text-sm font-semibold text-indigo-500"> Simon Lewis </span>
            <span class="flex items-center text-xs text-gray-500"> Head of marketing at Resnet </span>
          </div>
        </div>
      </div>
      <div class="relative rounded-xl bg-white p-4 shadow-md">
        <p class="text-sm text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis aliquam vero illo fuga libero nihil quisquam, aspernatur sint.</p>
        <div class="mt-4 flex items-center">
          <a href="#" class="relative block">
            <img alt="" src="/images/-ytzjgg6lxK1ICPcNfXho.png" class="mx-auto h-10 w-10 rounded-full object-cover" />
          </a>
          <div class="ml-2 flex flex-col justify-between">
            <span class="text-sm font-semibold text-indigo-500"> Simon Lewis </span>
            <span class="flex items-center text-xs text-gray-500"> Head of marketing at Resnet </span>
          </div>
        </div>
      </div>
      <div class="relative rounded-xl bg-white p-4 shadow-md">
        <p class="text-sm text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, pariatur. elit. Facilis aliquam vero illo fuga libero nihil quisquam, aspernatur sint.</p>
        <div class="mt-4 flex items-center">
          <a href="#" class="relative block">
            <img alt="" src="/images/Bm8G0V9ytRbCalT-KOSMT.png" class="mx-auto h-10 w-10 rounded-full object-cover" />
          </a>
          <div class="ml-2 flex flex-col justify-between">
            <span class="text-sm font-semibold text-indigo-500"> Simon Lewis </span>
            <span class="flex items-center text-xs text-gray-500"> Head of marketing at Resnet </span>
          </div>
        </div>
      </div>
      <div class="-mt-10 hidden h-40 flex-shrink-0 rounded-xl bg-indigo-50 md:block"></div>
    </div>
  </div>

</div>





    </>
  )

};

export default LandingPage;
