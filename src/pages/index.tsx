import { type Question } from "@prisma/client";
import { type NextPage } from "next";
import { useState, type PropsWithChildren } from "react";
import clsx from "clsx";
import { useStateList } from "react-use";
import Chance from "chance";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const chance = new Chance();

import { trpc } from "../utils/trpc";
import Image from "next/image";

const Button: React.FC<
  PropsWithChildren<{ onClick?: () => void; className?: string }>
> = ({ children, className = "", onClick }) => {
  return (
    <button
      onClick={() => onClick?.()}
      className={clsx("flex-1 rounded-md p-5 text-xl text-white", className)}
    >
      {children}
    </button>
  );
};

const useQuestions = (data: Question[] = []) => {
  const {
    prev,
    next,
    state: question,
    currentIndex,
    setState,
  } = useStateList(chance.shuffle(data));

  const [blacklist, setBlacklist] = useState<Question[]>([]);

  return {
    question,
    currentIndex,
    next,
  };
};

const QuestionViewer: React.FC<{ questions?: Question[] }> = ({
  questions,
}) => {
  const { question, next } = useQuestions(questions);
  const [parent] = useAutoAnimate();
  if (!question) return <>{questions?.length}</>;

  const { content, choiceA, choiceB } = question;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="mx-auto flex w-full max-w-sm flex-col">
        <Image
          alt="tito-boy"
          width={300}
          height={100}
          src="/tito-boy.jpg"
          className="mb-5 self-center rounded-xl"
        />
        {content && (
          <h1 className="mb-3 text-center text-2xl uppercase text-nord6">
            {content}
          </h1>
        )}
        <div
          ref={parent}
          className="flex min-h-[10vh] w-full items-center gap-3"
        >
          <Button onClick={next} className="bg-nord14 text-black">
            {choiceA}
          </Button>
          <h2 className="text-xl">or</h2>
          <Button onClick={next} className="bg-nord10">
            {choiceB}
          </Button>
        </div>
      </div>
    </div>
  );
};

const Home: NextPage = () => {
  const { data } = trpc.quesiton.getAll.useQuery(undefined, {
    staleTime: Infinity,
  });

  return (
    <div className="h-screen w-screen items-center justify-center bg-nord1 text-white">
      <QuestionViewer questions={data} />
    </div>
  );
};

export default Home;
