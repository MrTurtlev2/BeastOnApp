import {createContext, PropsWithChildren, RefObject, useContext, useMemo, useState} from 'react';
import PagerView from 'react-native-pager-view';
import {nanoid} from 'nanoid/non-secure';
import {IExercise} from '../constants/interfaces';

export type ExerciseSetUI = {
    uiId: string;
    weight: string;
    repetitions: string;
};

export type InitialPlan = {
    uuid?: string;
    lastModified?: number;
    name: string;
    daysOfWeek: number[];
    exercises: IExercise[];
};

type PlanFormContextType = {
    uuid?: string;
    lastModified?: number;
    planName: string;
    daysOfWeek: number[];
    exercises: IExercise[];
    currentExercise: IExercise | null;
    exerciseName: string;
    sets: ExerciseSetUI[];
    setPlanName: (name: string) => void;
    setDaysOfWeek: (days: number[]) => void;
    goToOverview: () => void;
    goToEditor: (exercise?: IExercise) => void;
    setExerciseName: (name: string) => void;
    addSet: () => void;
    removeSet: (uiId: string) => void;
    updateSet: (uiId: string, field: 'weight' | 'repetitions', value: string) => void;
    saveExercise: () => IExercise | null;
    cancelExercise: () => void;
    resetForm: () => void;
};

type Props = PropsWithChildren<{
    pagerRef: RefObject<PagerView | null>;
    initialPlan?: InitialPlan;
}>;

const PlanFormContext = createContext<PlanFormContextType | undefined>(undefined);

export const PlanFormProvider = ({children, pagerRef, initialPlan}: Props) => {
    const [planName, setPlanName] = useState(initialPlan?.name ?? '');
    const [daysOfWeek, setDaysOfWeek] = useState<number[]>(initialPlan?.daysOfWeek ?? []);
    const [exercises, setExercises] = useState<IExercise[]>(initialPlan?.exercises ?? []);
    const [currentExercise, setCurrentExercise] = useState<IExercise | null>(null);
    const [exerciseName, setExerciseName] = useState('');
    const [sets, setSets] = useState<ExerciseSetUI[]>([]);

    const goToOverview = () => {
        setCurrentExercise(null);
        setExerciseName('');
        setSets([]);
        pagerRef.current?.setPage(0);
    };

    const goToEditor = (exercise?: IExercise) => {
        if (exercise) {
            setCurrentExercise(exercise);
            setExerciseName(exercise.name);
            setSets(
                exercise.sets.map(set => ({
                    uiId: nanoid(),
                    weight: String(set.weight),
                    repetitions: String(set.repetitions),
                })),
            );
        } else {
            setCurrentExercise(null);
            setExerciseName('');
            setSets([]);
        }
        pagerRef.current?.setPage(1);
    };

    const addSet = () => {
        setSets(prev => [
            ...prev,
            {
                uiId: nanoid(),
                weight: '',
                repetitions: '',
            },
        ]);
    };

    const removeSet = (uiId: string) => {
        setSets(prev => prev.filter(set => set.uiId !== uiId));
    };

    const updateSet = (uiId: string, field: 'weight' | 'repetitions', value: string) => {
        setSets(prev =>
            prev.map(set =>
                set.uiId === uiId
                    ? {
                          ...set,
                          [field]: value,
                      }
                    : set,
            ),
        );
    };

    const saveExercise = (): IExercise | null => {
        const exercise: IExercise = {
            name: exerciseName.trim(),
            sets: sets.map(set => ({
                weight: Number(set.weight),
                repetitions: Number(set.repetitions),
            })),
        };

        setExercises(prev => {
            if (currentExercise) {
                return prev.map(item => (item.name === currentExercise.name ? exercise : item));
            }
            return [...prev, exercise];
        });
        goToOverview();
        return exercise;
    };

    const cancelExercise = () => {
        goToOverview();
    };

    const resetForm = () => {
        setPlanName('');
        setDaysOfWeek([]);
        setExercises([]);
        setCurrentExercise(null);
        setExerciseName('');
        setSets([]);
        pagerRef.current?.setPage(0);
    };

    const value = useMemo(
        () => ({
            uuid: initialPlan?.uuid,
            lastModified: initialPlan?.lastModified,
            planName,
            daysOfWeek,
            exercises,
            currentExercise,
            exerciseName,
            sets,
            setPlanName,
            setDaysOfWeek,
            goToOverview,
            goToEditor,
            setExerciseName,
            addSet,
            removeSet,
            updateSet,
            saveExercise,
            cancelExercise,
            resetForm,
        }),
        [initialPlan?.uuid, initialPlan?.lastModified, planName, daysOfWeek, exercises, currentExercise, exerciseName, sets],
    );

    return <PlanFormContext.Provider value={value}>{children}</PlanFormContext.Provider>;
};

export const usePlanForm = () => {
    const context = useContext(PlanFormContext);
    if (!context) {
        throw new Error('usePlanForm must be used inside PlanFormProvider');
    }
    return context;
};
