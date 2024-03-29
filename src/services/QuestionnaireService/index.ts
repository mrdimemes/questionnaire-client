import api from "src/api";
import { wrapFetchError } from "src/api/utils";
import store from "src/redux";
import {
  Tag,
  Questionnaire,
  QuestionnaireAnswerDTO,
  SortOption,
} from "src/models";
import { setTags } from "src/redux/slices/tagsSlice";

import type {
  AnswersFromServer,
  QuestionnaireCardsBunch,
  UserStatistics,
} from "src/types";


class QuestionnaireService {
  static async getTags() {
    try {
      const response = await api.get<Tag[]>("questionnaires/tags");
      store.dispatch(setTags(response.data));
    } catch (error) {
      throw wrapFetchError(error);
    };
  };

  static async getAnswers(questionnaireId: number) {
    try {
      const response = await api.get<AnswersFromServer[]>(
        "questionnaires/getAnswers/" + questionnaireId,
      );
      return response.data;
    } catch (error) {
      throw wrapFetchError(error);
    };
  };

  static async getStatistics(userId: number) {
    try {
      const response = await api.get<UserStatistics>(
        "questionnaires/getStatistics/" + userId,
      );
      return response.data;
    } catch (error) {
      throw wrapFetchError(error);
    };
  };

  static async getQuestionnaireCards(
    sortOption: SortOption,
    searchPhrase: string,
    filterTag: number | null,
    startPage: number,
    cardsPerPage: number,
  ) {
    try {
      const response = await api.get<QuestionnaireCardsBunch>(
        "questionnaires/questionnaireCards",
        {
          params: {
            sortOption,
            searchPhrase,
            filterTag,
            startPage,
            cardsPerPage,
          },
        },
      );
      return response.data;
    } catch (error) {
      throw wrapFetchError(error);
    };
  };

  static async getQuestionnaire(id: number) {
    try {
      const response =
        await api.get<Questionnaire>("questionnaires/questionnaire/" + id);
      return response.data;
    } catch (error) {
      throw wrapFetchError(error);
    };
  };

  static async sendQuestionnaireAnswer(answerDTO: QuestionnaireAnswerDTO) {
    try {
      const userId = store.getState().auth.userId;
      await api.post<any>(
        "questionnaires/saveAnswer",
        { userId: userId, answer: answerDTO },
      );
    } catch (error) {
      throw wrapFetchError(error);
    };
  };

  static async editQuestionnaire(questionnaire: Questionnaire) {
    try {
      await api.post<any>(
        "questionnaires/editQuestionnaire",
        { questionnaire },
      );
    } catch (error) {
      throw wrapFetchError(error);
    };
  };

  static async removeQuestionnaire(id: number) {
    try {
      await api.post<any>("questionnaires/removeQuestionnaire", { id });
    } catch (error) {
      throw wrapFetchError(error);
    };
  };

  static async addQuestionnaire(questionnaire: Questionnaire) {
    try {
      await api.post<any>(
        "questionnaires/addQuestionnaire",
        { questionnaire },
      );
    } catch (error) {
      throw wrapFetchError(error);
    };
  };

  static async addTag(label: string) {
    try {
      const response =
        await api.post<number>("questionnaires/addTag", { label });
      const tagId = response.data;
      return tagId;
    } catch (error) {
      throw wrapFetchError(error);
    };
  };

  static async removeTag(tagId: number) {
    try {
      await api.post<any>("questionnaires/removeTag", { tagId });
    } catch (error) {
      throw wrapFetchError(error);
    };
  };
};

export default QuestionnaireService;