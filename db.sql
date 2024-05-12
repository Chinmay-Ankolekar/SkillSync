create table users (
    id serial primary key,
    name text ,
    email text ,
    type text
);

CREATE TABLE jobs (
    id SERIAL PRIMARY KEY,
    company_name TEXT NOT NULL,
    name TEXT NOT NULL,
    designation TEXT NOT NULL,
    description TEXT NOT NULL,
    skills TEXT NOT NULL,
    experience TEXT NOT NULL,
    location TEXT NOT NULL,
    salary TEXT,
    created_by text NOT NULL,
    foreign key (created_by) references users (id)
);

create table job_applications (
    id serial primary key,
    job_id text,
    user_id text,
    foreign key (job_id) references jobs (id),
    foreign key (user_id) references users (id)
);

