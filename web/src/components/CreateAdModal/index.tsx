import { useEffect, useState, FormEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as Checkobox from "@radix-ui/react-checkbox";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { Check, GameController } from "phosphor-react";
import { Input } from "../Form/Input";
import { GameProps } from "../../App";

type GameType = Pick<GameProps, "title" | "id">;

export function CreateAdModal() {
  const [games, setGames] = useState<GameType[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);

  const handleCreateAd = (event: FormEvent) => {
    console.log(event.currentTarget.nodeValue, event.target);
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.entries(formData);
    console.log(formData);
  };

  useEffect(() => {
    fetch("http://localhost:3333/games")
      .then((resp) => resp.json())
      .then((data) => setGames(data));
  }, []);

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/50 inset-0 fixed" />
      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black">
        <Dialog.Title className="text-3xl  font-black">
          Públique um anúncio.
        </Dialog.Title>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            console.log(event);
          }}
          className="mt-8 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">
              {" "}
              Qual o game ?{" "}
            </label>
            <select
              id="game"
              name="game"
              className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
            >
              <option value="" disabled>
                Selecione o game que deseja jogar
              </option>

              {games.map((game) => (
                <option key={game.id} value="">
                  {game.title}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label htmlFor="nickname"> Seu nome ( ou nickname ) </label>
            <Input
              type="text"
              placeholder="Selecione o game que deseja jogar"
              id="nickname"
              name="nickname"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="yearsPlaying"> Joga a quantos anos ? </label>
              <Input
                type="number"
                placeholder="Tudo bem ser ZERO"
                id="yearsPlaying"
                name="yearsPlaying"
              />
            </div>
            <div>
              <label htmlFor="discord"> Qual seu Discord ? </label>
              <Input
                type="text"
                placeholder="Usuário#0000"
                id="discord"
                name="discord"
              />
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays">Quando costuma jogar ?</label>
              <div>
                <ToggleGroup.Root
                  type="multiple"
                  className=" grid grid-cols-4 gap-2"
                  onValueChange={setWeekDays}
                  value={weekDays}
                >
                  <ToggleGroup.Item
                    value={"0"}
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("0") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                    title="Domingo"
                  >
                    D
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value={"1"}
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("1") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                    title="Segunda"
                  >
                    S
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value={"2"}
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("2") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                    title="Terça"
                  >
                    T
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value={"3"}
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("3") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                    title="Quarta"
                  >
                    Q
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value={"4"}
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("4") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                    title="Quinta"
                  >
                    Q
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value={"5"}
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("5") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                    title="Sexta"
                  >
                    S
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value={"6"}
                    className={`w-8 h-8 rounded ${
                      weekDays.includes("6") ? "bg-violet-500" : "bg-zinc-900"
                    }`}
                    title="Sábado"
                  >
                    S
                  </ToggleGroup.Item>
                </ToggleGroup.Root>
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart">Qual horário ?</label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="time"
                  placeholder="De"
                  id="hourStart"
                  name="hourStart"
                />
                <Input
                  type="time"
                  placeholder="Até"
                  id="hourEnd"
                  name="hourEnd"
                />
              </div>
            </div>
          </div>
          <label className="mt-2 flex gap-2 text-sm items-center">
            <Checkobox.Root className="w-6 h-6 rounded bg-zinc-900 p-1">
              <Checkobox.Indicator>
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkobox.Indicator>
            </Checkobox.Root>
            Custumo me conectar ao chat de voz
          </label>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close
              type="button"
              className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
            >
              Cancelar
            </Dialog.Close>
            <button
              type="submit"
              className="flex items-center gap-3 bg-violet-500 px-5 h-12 rounded-md font-semibold hover:bg-violet-600"
            >
              <GameController className="w-6 h-6 " /> Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
